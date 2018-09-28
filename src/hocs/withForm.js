// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import uuidv1 from 'uuid/v1'
// local_module
import FormComponent from '../components/FormComponent'
import firebase from '../configs/firebase'
import ui from '../configs/ui'
import { errorAlert, successAlert } from '../helpers'

function withForm(params) {
  const {
    field,
    buttonTitle,
    resource,
    belong
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.options = {}
      this.state = {
        isLoading: true,
        event: '載入中'
      }
    }

    componentDidMount() {
      this.fetchOptions()
    }

    fetchOptions = async () => {
      try {
        const optionPromise = belong.map(belongResource => firebase.database().ref(belongResource + 's').orderByChild('name').once('value'))
        const snap_arr = await Promise.all(optionPromise)
        snap_arr.forEach((snap,index) => {
          const keys = Object.keys(snap.val() || {})
          const options = keys.map(key => ({
            key,
            name: snap.val()[key]['name'],
            id: snap.val()[key]['id']
          }))
          this.options[belong[index]] = options
        })
      } catch(err) {
        errorAlert(this.props.alert,'下載資料錯誤 : ' + err.toString())
      } finally {
        this.setState({
          isLoading: false,
          gender: ui.gender,
          education: ui.education,
          ...this.options
        })
      }
    }

    onClickNewPageButton = (state) => {
      this.setState({
        isLoading: true,
        event: '新增資料中'
      },async () => {
        try {
          let attach_data = {}
          let user_id = uuidv1()
          belong.forEach(belongResource => {
            const ele = this.options[belongResource].find(ele => ele.key === state[belongResource])
            attach_data[belongResource + '_name'] = ele.name || null
            attach_data[belongResource + '_id'] = ele.id || null
          })
          const upload_data = Object.assign({},state,attach_data)
          if (resource === 'referees' || resource === 'sales' || resource === 'employees' || resource === 'members') {
            if (state.id) {
              const id_snap = await firebase.database().ref(resource).orderByChild('id').equalTo(state.id).once('value')
              if (id_snap.val()) {
                throw "代號重複"
              }
            }
            if (state.account) {
              const user_snap = await firebase.database().ref('/users').orderByChild('account').equalTo(state.account).once('value')
              if (user_snap.val()) {
                throw "帳號重複"
              }
            }
            if (resource === 'referees' || resource === 'sales' || resource === 'employees') {
              await firebase.database().ref('/users/' + user_id).set({
                account: state.account,
                password: state.password,
                resource
              })
              if (resource === 'employees') {
                await firebase.auth().createUserWithEmailAndPassword(state.account,state.password)
              }
            } else if (resource === 'members') {
              await firebase.database().ref('referees/' +  state['referee'] + '/memberCount').transaction(memberCount => {
                if (!memberCount) {
                  return 1
                } else {
                  return memberCount + 1
                }
              })
              await firebase.database().ref('sales/' +  state['sale'] + '/memberCount').transaction(memberCount => {
                if (!memberCount) {
                  return 1
                } else {
                  return memberCount + 1
                }
              })
            }
          } else if (resource === 'clubs') {
            if (state.name) {
              const name_snap = await firebase.database().ref(resource).orderByChild('name').equalTo(state.name).once('value')
              if (name_snap.val()) {
                throw "俱樂部名稱重複"
              }
            }            
          }
          await firebase.database().ref(resource + '/' + user_id).set(upload_data)
          successAlert(this.props.alert,'新增成功')
        } catch(err) {
          errorAlert(this.props.alert,'新增失敗 : ' + err.toString())
        } finally {
          this.setState({
            isLoading: false
          },() => {
            this.props.history.push('/' + resource + '/index')
          })
        }
      })
    }

    onClickNewPageReturn = () => {
      this.props.history.push('/' + resource + '/index')
    }

    render() {
      return(
        <div 
          style={styles.container} 
        >
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <CircularProgress size={50}/>
              <h3>{this.state.event}</h3>
            </div>
            :
            <FormComponent
              {...this.props}
              {...this.state}
              field={field}
              buttonTitle={buttonTitle}
              onClickNewPageButton={this.onClickNewPageButton}
              onClickNewPageReturn={this.onClickNewPageReturn}
            />
          }
        </div>
      )
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default withForm