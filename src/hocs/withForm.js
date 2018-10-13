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

    fetchOptions = () => {
      this.setState({
        isLoading: true
      },async () => {
        try { 
          await sleep(500)
          this.options = {}
          const optionsPromise = belong.map(belongResource => firebase.database().ref(belongResource + 's').orderByChild('club_id').equalTo(this.props.HoldemStore.clubId).once('value'))
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
                id_name: val[key].id// + ' : ' + val[key].name
              })
            })
            options[belong[index] + '_key'] = option
          })
          this.setState({
            isLoading: false,
            gender: ui.gender,
            education: ui.education,
            ...options
          })
        } catch(err) {
          errorAlert(this.props.alert,'載入資料發生錯誤 : ' + err.toString())
        } finally {
          //
        }
      })
    }

    onClickNewPageButton = (state) => {
      this.setState({
        isLoading: true,
        event: '新增資料中'
      },async () => {
        try {
          await sleep(500)
          if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
            // 先檢查帳號有無重複
            if (state.account) {
              const user_snap = await firebase.database().ref('/backends').orderByChild('account').equalTo(state.account).once('value')
              if (user_snap.val()) {
                throw "帳號重複"
              }
            }
            // 先檢查代號有無重複
            if (state.id) {
              const id_snap = await firebase.database().ref(resource).orderByChild('id').equalTo(state.id).once('value')
              if (id_snap.val()) {
                throw "代號重複"
              }
              const nonuse_id_snap = await firebase.database().ref('nonuse_' + resource).orderByChild('id').equalTo(state.id).once('value')
              if (nonuse_id_snap.val()) {
                throw "代號重複"
              }
            }
            // 整理上傳資料
            const key = uuidv1()
            let upload_data = Object.assign({},state)
            if (resource === 'clubs') {
              upload_data = Object.assign({},state,{
                key,
                club_key: key,
                club_id: state.id,
                club_id_id: state.id + '_' + state.id,
                club_id_name: state.id + '_' + state.name,
                employeeCount: 0,
                refereeCount: 0, 
                saleCount: 0,
                memberCount: 0
              })
            } else if (resource === 'employees') {
              upload_data = Object.assign({},state,{
                key,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId,
                club_id_id: this.props.HoldemStore.clubId + '_' + state.id,
                club_id_name: this.props.HoldemStore.clubId + '_' + state.name
              })            
            } else if (resource === 'referees' || resource === 'sales') {
              upload_data = Object.assign({},state,{
                key,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId,
                club_id_id: this.props.HoldemStore.clubId + '_' + state.id,
                club_id_name: this.props.HoldemStore.clubId + '_' + state.name,
                memberCount: 0
              })
            } else if (resource === 'members') {
              upload_data = Object.assign({},state,{
                key,
                chip: 0, 
                noLimit: false,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId,
                club_id_id: this.props.HoldemStore.clubId + '_' + state.id,
                club_id_name: this.props.HoldemStore.clubId + '_' + state.name,
                referee_key: state['referee_key'],
                referee_id: this.options[state['referee_key']].id, 
                sale_key: state['sale_key'],
                sale_id: this.options[state['sale_key']].id
              })
            }        
            // 寫資料
            if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales') {
              if (resource === 'employees') {
                await firebase.auth().createUserWithEmailAndPassword(state.account,state.password)
              }
              if (resource === 'clubs') {
                key && await firebase.database().ref('/backends/' + key).set({
                  key,
                  id: state.id,
                  club_id: state.id,
                  club_key: key,
                  account: state.account,
                  password: state.password,
                  resource
                })
              } else {
                key && await firebase.database().ref('/backends/' + key).set({
                  key,
                  id: state.id,
                  club_key: this.props.HoldemStore.clubKey,
                  club_id: this.props.HoldemStore.clubId,
                  account: state.account,
                  password: state.password,
                  resource 
                })               
              }
              if (resource === 'employees') {
                state['club_key'] && await firebase.database().ref('/clubs/' +  state['club_key'] + '/employeeCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                }) 
              } else if (resource === 'referees') {
                state['club_key'] && await firebase.database().ref('/clubs/' +  state['club_key'] + '/refereeCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                })                
              } else if (resource === 'sales') {
                state['club_key'] && await firebase.database().ref('/clubs/' +  state['club_key'] + '/saleCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                })                
              }
            } else if (resource === 'members') {
              state['club_key'] && await firebase.database().ref('/clubs/' +  state['club_key'] + '/memberCount').transaction(count => {
                if (count) {
                  return count + 1
                } else {
                  return 1
                }
              })
              state['referee_key'] && await firebase.database().ref('/referees/' +  state['referee_key'] + '/memberCount').transaction(count => {
                if (count) {
                  return count + 1
                } else {
                  return 1
                }
              })
              state['sale_key'] && await firebase.database().ref('/sales/' +  state['sale_key'] + '/memberCount').transaction(count => {
                if (count) {
                  return count + 1
                } else {
                  return 1
                }
              })
            }
            resource && key && await firebase.database().ref(resource + '/' + key).set(upload_data)
          } else {
            throw '使用者身份錯誤'
          }
          successAlert(this.props.alert,'新增成功')
        } catch(err) {
          errorAlert(this.props.alert,'新增失敗 : ' + err.toString())
        } finally {
          this.setState({
            isLoading: false
          })
        }
      })
    }

    onClickNewPageReturn = () => {
      this.goBack()
    }

    goBack = () => {
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
            </div>
            :
            <FormComponent
              {...this.props}
              {...this.state}
              clubId={this.props.HoldemStore.clubId}
              clubKey={this.props.HoldemStore.clubKey}
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