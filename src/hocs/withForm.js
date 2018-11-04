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
      this.db = this.props.db
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
          await sleep(ui.delayTime)
          this.options = {}
          let options = {}
          const optionsPromise = belong.map(belongResource => this.db.collection(belongResource + 's')
            .where("club_id", "==", this.props.HoldemStore.clubId)
            .where("quit", "==", false)
            .get())
          const optionsSnap = await Promise.all(optionsPromise)
          optionsSnap.forEach((snap,index) => {
            const option = snap.docs.map(doc => {
              const data = doc.data()
              this.options[data.key] = {
                id: data.id,
                name: data.name
              }
              return ({
                key: data.key,
                id_name: data.id
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
          await sleep(ui.delayTime)
          let key = uuidv1()
          let upload_data = {}
          if (resource === 'clubs' || resource === 'employees' || resource === 'referees' || resource === 'sales' || resource === 'members') {
            // 整理資料
            switch(resource) {
            case 'clubs':
              upload_data = Object.assign({},data,{
                key,
                employeeCount: 0,
                refereeCount: 0, 
                saleCount: 0,
                memberCount: 0,
                quit: false
              })
            break
            case 'employees':
              upload_data = Object.assign({},data,{
                key,
                quit: false,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId
              })
              break
            case 'referees':
            case 'sales':
              upload_data = Object.assign({},data,{
                key,
                memberCount: 0,
                quit: false,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId
              })
              break
            case 'members':
              upload_data = Object.assign({},data,{
                key,
                totalChip: 0, 
                chipNoLimit: false,
                quit: false,
                referee_key: data['referee_key'],
                referee_id: this.options[data['referee_key']].id, 
                sale_key: data['sale_key'],
                sale_id: this.options[data['sale_key']].id,
                club_key: this.props.HoldemStore.clubKey,
                club_id: this.props.HoldemStore.clubId
              })
              break
            }
            // 上傳資料
            if (resource === 'employees') { await firebase.auth().createUserWithEmailAndPassword(data.account,data.password) }
            await this.db.runTransaction(async (transaction) => {
              // 寫入計數
              if (resource !== 'clubs') {
                const club_ref = this.db.collection('clubs').doc(data['club_key'])
                const club_doc = await transaction.get(club_ref)
                const club_data = club_doc.data()
                if (resource === 'employees' || resource === 'referees' || resource === 'sales') {
                  if (!club_doc.exists) { throw '協會不存在' }
                  switch(resource) { 
                  case 'employees':
                    const employeeCount = club_data.employeeCount ? club_data.employeeCount + 1 : 0
                    await transaction.update(club_ref, { employeeCount })
                    break
                  case 'referees':
                    const refereeCount = club_data.refereeCount ? club_data.refereeCount + 1 : 0
                    await transaction.update(club_ref, { refereeCount })
                    break
                  case 'sales':
                    const saleCount = club_data.saleCount ? club_data.saleCount + 1 : 0
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
                  memberCount = (club_data.memberCount || 0) + 1
                  await transaction.update(club_ref, { memberCount })
                  memberCount = (referee_data.memberCount || 0) + 1
                  await transaction.update(referee_ref, { memberCount })
                  memberCount = (sale_data.memberCount || 0) + 1
                  await transaction.update(sale_ref, { memberCount })
                }
              }
              // 寫入資料
              const id_ref = this.db.collection('ids').doc(key)
              const resource_ref = this.db.collection(resource).doc(key)
              await transaction.set(id_ref,{
                id: data.id
              })
              await transaction.set(resource_ref,upload_data)
              if (resource !== 'members') {
                const backend_ref = this.db.collection('backends').doc(key)
                await transaction.set(backend_ref,{
                  key,
                  id: data.id,
                  club_key: resource === 'clubs' ? key : this.props.HoldemStore.clubKey,
                  club_id: resource === 'clubs' ? data.id : this.props.HoldemStore.clubId,
                  account: data.account,
                  password: data.password,
                  quit: false,
                  resource
                })
              }
              // 檢查資料
              const check_ids_docs = await this.db.collection('ids').where("id", "==", data.id).get()
              if (!check_ids_docs.empty) { throw '代號重複' }
              if (resource !== 'members') {
                const check_backends_docs = await this.db.collection('backends').where("account", "==", data.account).get()
                if (!check_backends_docs.empty) { throw '帳號重複' }
              }
            })
          } else {
            throw '資源錯誤'
          }
          successAlert(this.props.alert,'新增成功')
        } catch(err) {
          if (resource === 'employees') {
            const currentUser = firebase.auth().currentUser
            if (currentUser) { (currentUser.email === data.account) && await currentUser.delete() }
          }
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