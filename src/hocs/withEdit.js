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
    by
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.search = this.props.match.params.search || ''
      this.state = {
        isLoading: true,
        event: '載入中',
        data: {}
      }
    }

    componentDidMount() {
      if (resource === 'members') {
        if (this.search === '$all') {
          this.fetchTableData(firebase.database().ref(resource))
        } else {
          switch(by) {
            case 'memberName':
              this.fetchTableData(firebase.database().ref(resource).orderByChild('name').equalTo(this.search))
              break
            case 'refereeId':
              this.fetchTableData(firebase.database().ref(resource).orderByChild('referee_id').equalTo(this.search))
              break
            case 'saleId':
              this.fetchTableData(firebase.database().ref(resource).orderByChild('sale_id').equalTo(this.search))
              break 
            default:
              this.fetchTableData(firebase.database().ref(resource).orderByChild('id').equalTo(this.search))
              break           
          }
        } 
      } else {
        if (this.search === '$all') {
          this.fetchTableData(firebase.database().ref(resource))
        } else {
          this.fetchTableData(firebase.database().ref(resource).orderByChild('id').equalTo(this.search))
        }        
      }
    }

    fetchTableData = async (fetch) => {
      try {
        await sleep(500)
        const snap = fetch && (await fetch.once('value'))
        const val = (snap && snap.val()) || {}
        //const data = Object.values(val) || []
        this.setState({
          isLoading: false,
          data: val
        }) 
      } catch(err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        //
      }      
    }

    updateTableData = (data) => {
      this.setState({
        isLoading: true,
        event: '更新資料中'
      },async () => {
        try {
          let id_names = {}
          const keys = Object.keys(data)
          keys.forEach(key => {
            const id = data[key]['id']
            const name = data[key]['name']
            const id_name = id + '(' + name + ')'
            data[key]['id_name'] = id_name
            id_names[key] = id_name
          })
          await firebase.database().ref(resource).update(data)
          await firebase.database().ref('id_names').update(id_names)
          await sleep(500)
          successAlert(this.props.alert,'更新成功')
        } catch(err) {
          errorAlert(this.props.alert,'更新失敗 : ' + err.toString())
        } finally {
          this.setState({
            isLoading: false
          })
        }
      })
    }

    deleteTableData = (key) => {
      this.setState({
        isLoading: true,
        event: '刪除資料中'
      },async () => {
        try {
          const snap = await firebase.database().ref(resource + '/' + key + '/memberCount').once('value')
          if (snap.val() === null || snap.val() === 0) {
            // 刪除會員和資料
            successAlert(this.props.alert,'刪除成功')
          } else {
            throw '此人底下存在會員'
          }
        } catch(err) {
          errorAlert(this.props.alert,'刪除失敗 : ' + err.toString())
        } finally {
          this.setState({
            isLoading: false
          })
        }
      })      
    }

    gotToAccount = (key) => {
      this.props.history.push('/'+ resource + '/account/' + key)
    }

    gotToPassword = (key) => {
      this.props.history.push('/'+ resource + '/password/' + key)
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
              <h3>{this.state.event}</h3>
            </div>
            :
            <Component
              {...this.props}
              {...this.state}
              title={title}
              onClickTableReturnButton={this.goBack}
              onClickAccount={this.gotToAccount}
              onClickPassword={this.gotToPassword}
              onClickTableConfirmButton={this.updateTableData}
              confirmDelete={this.deleteTableData}
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