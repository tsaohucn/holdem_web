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
            const non_quit_keys = keys.filter(key => !val[key].quit)
            const option = non_quit_keys.map(key => {
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

    onClickNewPageButton = (data) => {
      this.setState({
        isLoading: true,
        event: '新增資料中'
      },async () => {
        try {
          await sleep(500)
          if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
            // 先檢查代號有無重複
            if (data.id) {
              const id_snap = await firebase.database().ref('/ids').orderByChild('id').equalTo(data.id).once('value')
              if (id_snap.val()) {
                throw "代號重複"
              }
            }
            // 先檢查帳號有無重複
            if (data.account) {
              const account_snap = await firebase.database().ref('/backends').orderByChild('account').equalTo(data.account).once('value')
              if (account_snap.val()) {
                throw "帳號重複"
              }
            }
            // 整理資料
            const key = uuidv1()
            let upload_data = Object.assign({},data)
            if (resource === 'clubs') {
              upload_data = Object.assign({},data,{
                key,
                club_key: key,
                club_id: data.id,
                club_id_id: data.id + '_' + data.id,
                club_id_name: data.id + '_' + data.name,
                club_id_club_id: data.id + '_' + data.id,
                //club_id_id_quit: data.id + '_' + data.id + '_' + false,
                //club_id_name_quit: data.id + '_' + data.name + '_' + false,
                //club_id_club_id_quit: data.id + '_' + data.id + '_' + false,
                employeeCount: 0,
                refereeCount: 0, 
                saleCount: 0,
                memberCount: 0,
                quit: false
              })
            } else if (resource === 'employees') {
              upload_data = Object.assign({},data,{
                key,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId,
                club_id_id: this.props.HoldemStore.clubId + '_' + data.id,
                club_id_name: this.props.HoldemStore.clubId + '_' + data.name,
                club_id_club_id: this.props.HoldemStore.clubId + '_' + this.props.HoldemStore.clubId,
                //club_id_id_quit: this.props.HoldemStore.clubId + '_' + data.id + '_' + false,
                //club_id_name_quit: this.props.HoldemStore.clubId + '_' + data.name + '_' + false,
                //club_id_club_id_quit: this.props.HoldemStore.clubId + '_' + this.props.HoldemStore.clubId + '_' + false,
                quit: false
              })            
            } else if (resource === 'referees' || resource === 'sales') {
              upload_data = Object.assign({},data,{
                key,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId,
                club_id_id: this.props.HoldemStore.clubId + '_' + data.id,
                club_id_name: this.props.HoldemStore.clubId + '_' + data.name,
                club_id_club_id: this.props.HoldemStore.clubId + '_' + this.props.HoldemStore.clubId,
                //club_id_id_quit: this.props.HoldemStore.clubId + '_' + data.id + '_' + false,
                //club_id_name_quit: this.props.HoldemStore.clubId + '_' + data.name + '_' + false,
                //club_id_club_id_quit: this.props.HoldemStore.clubId + '_' + this.props.HoldemStore.clubId + '_' + false,
                memberCount: 0,
                quit: false
              })
            } else if (resource === 'members') {
              upload_data = Object.assign({},data,{
                key,
                chip: 0, 
                chipNoLimit: false,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId,
                club_id_id: this.props.HoldemStore.clubId + '_' + data.id,
                club_id_name: this.props.HoldemStore.clubId + '_' + data.name,
                club_id_club_id: this.props.HoldemStore.clubId + '_' + this.props.HoldemStore.clubId,
                club_id_referee_id: this.props.HoldemStore.clubId + '_' + this.options[data['referee_key']].id,
                club_id_sale_id: this.props.HoldemStore.clubId + '_' + this.options[data['sale_key']].id,
                //club_id_id_quit: this.props.HoldemStore.clubId + '_' + data.id + '_' + false,
                //club_id_name_quit: this.props.HoldemStore.clubId + '_' + data.name + '_' + false,
                //club_id_club_id_quit: this.props.HoldemStore.clubId + '_' + this.props.HoldemStore.clubId + '_' + false,
                //club_id_referee_id_quit: this.props.HoldemStore.clubId + '_' + this.options[data['referee_key']].id + '_' + false,
                //club_id_sale_id_quit: this.props.HoldemStore.clubId + '_' + this.options[data['sale_key']].id + '_' + false,
                referee_key: data['referee_key'],
                referee_id: this.options[data['referee_key']].id, 
                sale_key: data['sale_key'],
                sale_id: this.options[data['sale_key']].id,
                quit: false
              })
            }        
            // backends
            if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales') {
              if (resource === 'employees') {
                await firebase.auth().createUserWithEmailAndPassword(data.account,data.password)
              }
              if (resource === 'clubs') {
                key && await firebase.database().ref('/backends/' + key).set({
                  key,
                  id: data.id,
                  club_id: data.id,
                  club_key: key,
                  account: data.account,
                  password: data.password,
                  quit: false,
                  resource
                })
              } else {
                key && await firebase.database().ref('/backends/' + key).set({
                  key,
                  id: data.id,
                  club_key: this.props.HoldemStore.clubKey,
                  club_id: this.props.HoldemStore.clubId,
                  account: data.account,
                  password: data.password,
                  quit: false,
                  resource 
                })               
              }
            }
            // upload_data
            resource && key && await firebase.database().ref(resource + '/' + key).set(upload_data)
            // ids
            data.id && await firebase.database().ref('/ids/' + key + '/id').set(data.id)
            // count
            if (resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
              switch(resource) { 
              case 'employees':
                data['club_key'] && await firebase.database().ref('/clubs/' +  data['club_key'] + '/employeeCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                })
                break
              case 'referees':
                data['club_key'] && await firebase.database().ref('/clubs/' +  data['club_key'] + '/refereeCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                })
                break
              case 'sales':
                data['club_key'] && await firebase.database().ref('/clubs/' +  data['club_key'] + '/saleCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                })
                break
              case 'members':
                data['club_key'] && await firebase.database().ref('/clubs/' +  data['club_key'] + '/memberCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                })
                data['referee_key'] && await firebase.database().ref('/referees/' +  data['referee_key'] + '/memberCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                })
                data['sale_key'] && await firebase.database().ref('/sales/' +  data['sale_key'] + '/memberCount').transaction(count => {
                  if (count) {
                    return count + 1
                  } else {
                    return 1
                  }
                })
                break          
              }
            }
          } else {
            throw '資源錯誤'
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