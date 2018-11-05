// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import EditComponent from '../components/EditComponent'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'
import ui from '../configs/ui'

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
      this.db = this.props.db
      this.delete = false
      this.account = null
      this.password = null
      this.state = {
        isLoading: true,
        data: {}
      }
    }

    componentDidMount() {
      const key = this.props.match.params.key
      this.fetchTableData(this.db.collection(resource).doc(key))
    }


    fetchTableData = async (fetch) => {
      this.setState({
        isLoading: true
      },async () => {
        try {
          await sleep(ui.delayTime)
          let options = {}
          const optionsPromise = belong && belong.map(belongResource => this.db.collection(belongResource + 's')
            .where("club_id", "==", this.props.HoldemStore.clubId)
            .where("quit", "==", false)
            .get())
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
          await sleep(ui.delayTime)
          const key = this.props.match.params.key
          let upload_data = {}
          if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
            // 整理資料
            if (resource === 'members') { 
              upload_data = Object.assign({},data,{
                chipLimit: parseInt(data['chipLimit']),
                rbPercentage: parseInt(data['rbPercentage'])            
              })
            } else {
              upload_data = data
            }
            // 上傳資料
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
            await this.db.runTransaction(async (transaction) => {
              if (resource !== 'members') {
                const backend_ref = this.db.collection('backends').doc(key)
                const check_account_ref = this.db.collection('backends')
                  .where("account", "==", data.account)
                  //.where("quit", "==", false)
                const check_account_docs = await transaction.get(check_account_ref)
                if ((!check_account_docs.empty) && (this.account != data.account)) { throw '帳號重複' }        
                await transaction.update(backend_ref, {
                  account: data.account,
                  password: data.password
                })
              }
              const resource_ref = this.db.collection(resource).doc(key)
              await transaction.update(resource_ref, upload_data)
            })
          } else {
            throw '資源錯誤'
          }
          successAlert(this.props.alert,'更新成功')
          this.goBack()
        } catch(err) {
          // 調整一下
          if (resource === 'employees') {
            const currentUser = firebase.auth().currentUser
            await currentUser.updateEmail(this.account)
            await currentUser.updatePassword(this.password)
          }
          errorAlert(this.props.alert,'更新失敗 : ' + err.toString())
          this.setState({
            isLoading: false
          })
        }
      })
    }

    deleteData = (data) => {
      this.setState({
        isLoading: true,
        event: '刪除資料中'
      },async () => {
        try {
          await sleep(ui.delayTime)
          this.delete = false
          const key = this.props.match.params.key
          if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
            const refereeCount = data.refereeCount
            const saleCount = data.saleCount
            const memberCount = data.memberCount
            const employeeCount = data.employeeCount
            // 檢查底下有無人
            if (employeeCount > 0 || refereeCount > 0 || saleCount > 0 || memberCount > 0) { throw '此人底下存在會員' }
            if (resource === 'employees') {
              await firebase.auth().signInWithEmailAndPassword(this.account,this.password)
              const currentUser = firebase.auth().currentUser
              await currentUser.delete()
              this.delete = true             
            }
            await this.db.runTransaction(async (transaction) => {
              const backend_ref = this.db.collection('backends').doc(key)
              const resource_ref = this.db.collection(resource).doc(key)
              if (resource !== 'clubs') {
                const club_ref = this.db.collection('clubs').doc(data['club_key'])
                const club_doc = await transaction.get(club_ref)
                const club_data = club_doc.data()
                if (resource === 'employees' || resource === 'referees' || resource === 'sales') {
                  if (!club_doc.exists) { throw '協會不存在' }
                  switch(resource) { 
                  case 'employees':
                    const employeeCount = club_data.employeeCount ? club_data.employeeCount - 1 : 0
                    await transaction.update(club_ref, { employeeCount })
                    break
                  case 'referees':
                    const refereeCount = club_data.refereeCount ? club_data.refereeCount - 1 : 0
                    await transaction.update(club_ref, { refereeCount })
                    break
                  case 'sales':
                    const saleCount = club_data.saleCount ? club_data.saleCount - 1 : 0
                    await transaction.update(club_ref, { saleCount })
                    break
                  }
                } else if (resource === 'members') {
                  let memberCount = 0
                  const referee_ref = this.db.collection('referees').doc(data['referee_key'])
                  const sale_ref = this.db.collection('sales').doc(data['sale_key'])
                  const referee_doc = await transaction.get(referee_ref)
                  const sale_doc = await transaction.get(sale_ref)
                  const referee_data = referee_doc.data()
                  const sale_data = sale_doc.data()
                  memberCount = club_data.memberCount ? club_data.memberCount - 1 : 0
                  await transaction.update(club_ref, { memberCount })
                  memberCount = referee_data.memberCount ? referee_data.memberCount - 1 : 0
                  await transaction.update(referee_ref, { memberCount })
                  memberCount = sale_data.memberCount ? sale_data.memberCount - 1 : 0
                  await transaction.update(sale_ref, { memberCount })
                }
              }
              if (resource !== 'members') { await transaction.update(backend_ref, { quit: true }) }  
              await transaction.update(resource_ref, { quit: true })     
            })
          }
          successAlert(this.props.alert,'刪除成功')
          this.goBack()
        } catch(err) {
          // 調整一下
          if (this.delete && (resource === 'employees')) {
            await firebase.auth().createUserWithEmailAndPassword(this.account,this.password)
            this.delete = false
          }
          errorAlert(this.props.alert,'刪除失敗 : ' + err.toString())
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