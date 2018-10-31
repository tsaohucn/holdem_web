// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import EditComponent from '../components/EditComponent'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withEdit(params) {
  const {
    title,
    resource,
    wrapperComponent,
    by,
    belong
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.key = this.props.match.params.key || ''
      this.account = null
      this.password = null
      this.state = {
        isLoading: true,
        data: {}
      }
    }

    componentDidMount() {
      this.fetchTableData(firebase.firestore().collection(resource).doc(this.key))
    }


    fetchTableData = async (fetch) => {
      this.setState({
        isLoading: true
      },async () => {
        try {
          await sleep(500)
          let options = {}
          const optionsPromise = belong && belong.map(belongResource => firebase.firestore().collection(belongResource + 's').where("club_id", "==", this.props.HoldemStore.clubId).get())
          const optionsSnap = await Promise.all(optionsPromise)
          optionsSnap.forEach((snap,index) => {
            const option = snap.docs.map(doc => {
              const data = doc.data()
              return({
                id: data.id,
                id_name: data.id
              })
            })
            options[belong[index] + '_id'] = option
          })
          const doc = await fetch.get()
          const data = doc.exists ? doc.data() : {}
          this.account = data.account
          this.password = data.password
          this.setState({
            isLoading: false,
            data,
            ...options
          }) 
        } catch(err) {
          errorAlert(this.props.alert,'載入資料發生錯誤 : ' + err.toString())
        } finally {
          //
        }
      })     
    }

    updateData = (data) => {
      this.setState({
        isLoading: true,
        event: '更新資料中'
      },async () => {
        try {
          await sleep(500)
          if (this.key) {
            if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
              // 先檢查帳號有無重複
              if (data.account) {
                const account_snap = await firebase.database().ref('/backends').orderByChild('account').equalTo(data.account).once('value')
                if (account_snap.val() && (this.account != data.account)) {
                  throw '此帳號已有人使用'
                }
              }
              // 更新資料
              if (resource === 'employees') {
                await firebase.auth().signInWithEmailAndPassword(this.account,this.password)
                const user = firebase.auth().currentUser
                if (this.account != data.account) {
                  await user.updateEmail(data.account)
                }
                if (this.password != data.password) {
                  await user.updatePassword(data.password)
                }
              }
              if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales') {
                await firebase.database().ref('/backends/' + this.key).update({
                  account: data.account,
                  password: data.password
                })
              }
              const upload_data = Object.assign({},data,{
                club_id_name: data.club_id + '_' + data.name
              })
              await firebase.database().ref(resource + '/' + this.key).update(upload_data)
            } else {
              throw '資源錯誤'
            }
          } else {
            throw '系統錯誤'
          }
          successAlert(this.props.alert,'更新成功')
          this.goBack()
        } catch(err) {
          errorAlert(this.props.alert,'更新失敗 : ' + err.toString())
          this.setState({
            isLoading: false
          })
        } finally {
          //
        }
      })
    }

    deleteData = (data) => {
      this.setState({
        isLoading: true,
        event: '刪除資料中'
      },async () => {
        try {
          await sleep(500)
          if (this.key) {
            if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
              const refereeCount = data.refereeCount
              const saleCount = data.saleCount
              const memberCount = data.memberCount
              const employeeCount = data.employeeCount
              // 檢查底下有無人
              if (employeeCount > 0 || refereeCount > 0 || saleCount > 0 || memberCount > 0) {
                throw '此人底下存在會員'
              } 
              // 刪資料
              if (resource === 'employees') {
                await firebase.auth().signInWithEmailAndPassword(this.account,this.password)
                const user = firebase.auth().currentUser
                await user.delete()              
              }
              if (resource !== 'members') {
                await firebase.database().ref('/backends/' + this.key).update({
                  quit: true
                })
              }
              // 改成加已刪除標記
              await firebase.database().ref(resource + '/' + this.key).update({
                quit: true
              })
              // count
              if (resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
                switch(resource) {
                  case 'employees':
                  await firebase.database().ref('clubs/' +  data['club_key'] + '/employeeCount').transaction(count => {
                    if (count) {
                      return count - 1
                    } else {
                      return 0
                    }
                  })
                  break
                  case 'referees':
                  await firebase.database().ref('clubs/' +  data['club_key'] + '/refereeCount').transaction(count => {
                    if (count) {
                      return count - 1
                    } else {
                      return 0
                    }
                  })
                  break
                  case 'sales':
                  await firebase.database().ref('clubs/' +  data['club_key'] + '/saleCount').transaction(count => {
                    if (count) {
                      return count - 1
                    } else {
                      return 0
                    }
                  })
                  break
                  case 'members':
                  await firebase.database().ref('clubs/' +  data['club_key'] + '/memberCount').transaction(count => {
                    if (count) {
                      return count - 1
                    } else {
                      return 0
                    }
                  })
                  await firebase.database().ref('referees/' +  data['referee_key'] + '/memberCount').transaction(count => {
                    if (count) {
                      return count - 1
                    } else {
                      return 0
                    }
                  })
                  await firebase.database().ref('sales/' +  data['sale_key'] + '/memberCount').transaction(count => {
                    if (count) {
                      return count - 1
                    } else {
                      return 0
                    }
                  })
                  break
                }
              }
            } else {
              throw '資源錯誤'
            }
          } else {
            throw '系統錯誤'
          }
          successAlert(this.props.alert,'刪除成功')
          this.goBack()
        } catch(err) {
          errorAlert(this.props.alert,'刪除失敗 : ' + err.toString())
        } finally {
          this.setState({
            isLoading: false
          })
        }
      })       
    }

    goBack = () => {
      this.props.history.goBack()
    }

    render() {
      const Component = wrapperComponent ? wrapperComponent : EditComponent
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
            <Component
              {...this.props}
              {...this.state}
              title={title}
              onClickEditReturnButton={this.goBack}
              onClickEditConfirmButton={this.updateData}
              confirmDelete={this.deleteData}
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

export default withEdit