// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import uuidv1 from 'uuid/v1'
// local_module
import FormComponent from '../components/FormComponent'
import firebase from '../configs/firebase'
import ui from '../configs/ui'
import { errorAlert, successAlert, sleep } from '../helpers'

function withForm(params) {
  const {
    buttonTitle,
    field,
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
        await sleep(500)
        this.options = {}
        const optionsPromise = belong.map(belongResource => firebase.database().ref(belongResource + 's').once('value'))
        const optionsSnap = await Promise.all(optionsPromise)
        let options = {}
        optionsSnap.forEach((snap,index) => {
          const val = snap.val()
          const keys = Object.keys(val || [])
          const option = keys.map(key => {
            this.options[key] = {
              id: val[key].id,
              name: val[key].name
            }
            return({
              key,
              name: val[key].id + ' : ' + val[key].name
            })
          })
          options[belong[index]] = option
        })
        this.setState({
          isLoading: false,
          gender: ui.gender,
          education: ui.education,
          ...options
        })
      } catch(err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        //
      }
    }

    onClickNewPageButton = (state) => {
      this.setState({
        isLoading: true,
        event: '新增資料中'
      },async () => {
        try {
          await sleep(500)
          let user_id = uuidv1()
          let upload_data = Object.assign({},state)
          if (resource === 'clubs') {
             upload_data = Object.assign({},state,{ 
              memberCount: 0, 
              refereeCount: 0, 
              saleCount: 0 
            })
          } else if (resource === 'referees' || resource === 'sales') {
             upload_data = Object.assign({},state,{ 
              memberCount: 0, 
              club: null,
              club_id: this.options[state['club']].id
            })
          } else if (resource === 'members') {
            upload_data = Object.assign({},state,{ 
              chip: 0, 
              noLimit: false,
              club: null,
              club_id: this.options[state['club']].id, 
              referee: null,
              referee_id: this.options[state['referee']].id, 
              sale: null,
              sale_id: this.options[state['sale']].id
            })
          }
          if (resource === 'clubs' || resource === 'referees' || resource === 'sales' || resource === 'employees' || resource === 'members') {
            if (state.id) {
              const id_snap = await firebase.database().ref(resource).orderByChild('id').equalTo(state.id).once('value')
              if (id_snap.val()) {
                throw "代號重複"
              }
            }
            if (state.account) {
              const user_snap = await firebase.database().ref('/backends').orderByChild('account').equalTo(state.account).once('value')
              if (user_snap.val()) {
                throw "帳號重複"
              }
            }
            if (resource === 'referees' || resource === 'sales' || resource === 'employees') {
              if (resource === 'employees') {
                await firebase.auth().createUserWithEmailAndPassword(state.account,state.password)
              }
              await firebase.database().ref('/backends/' + user_id).set({
                account: state.account,
                password: state.password,
                resource
              })
              if (resource === 'referees') {
                await firebase.database().ref('clubs/' +  state['club'] + '/refereeCount').transaction(memberCount => {
                  if (!memberCount) {
                    return 1
                  } else {
                    return memberCount + 1
                  }
                })                
              } else if (resource === 'sales') {
                await firebase.database().ref('clubs/' +  state['club'] + '/saleCount').transaction(memberCount => {
                  if (!memberCount) {
                    return 1
                  } else {
                    return memberCount + 1
                  }
                })                
              }
            } else if (resource === 'members') {
              await firebase.database().ref('clubs/' +  state['club'] + '/memberCount').transaction(memberCount => {
                if (!memberCount) {
                  return 1
                } else {
                  return memberCount + 1
                }
              })
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
          }
          await firebase.database().ref(resource + '/' + user_id).set(upload_data)
          this.setState({
            isLoading: false
          })
          successAlert(this.props.alert,'新增成功')
        } catch(err) {
          errorAlert(this.props.alert,'新增失敗 : ' + err.toString())
        } finally {
          //
        }
      })
    }

    onClickNewPageReturn = () => {
      this.props.history.goBack()
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