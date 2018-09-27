// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import EditComponent from '../components/EditComponent'
import firebase from '../configs/firebase'
import { errorAlert, successAlert } from '../helpers'

function withEdit(params) {
  const {
    title,
    resource,
    wrapperComponent,
    auth
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.id = this.props.match.params.id
      this.state = {
        isLoading: true,
        event: '下載資料中',
        data: {}
      }
    }

    componentDidMount() {
      if (this.id === '$all') {
        this.fetchTableData(firebase.database().ref(resource))
      } else {
        this.fetchTableData(firebase.database().ref(resource).orderByChild('id').equalTo(this.id))
      }
    }

    fetchTableData = async (fetch) => {
      let data = {}
      try {
        const snap = fetch && (await fetch.once('value'))
        data = (snap && snap.val()) || {}
      } catch(err) {
        errorAlert(this.props.alert,'下載失敗 : ' + err.toString())
      } finally {
        this.setState({
          isLoading: false,
          event: '下載資料中',
          data 
        })        
      }      
    }

    onClickEditConfirmButton = (data) => {
      this.setState({
        isLoading: true,
        event: '更新資料中'
      },async () => {
        try {
          await firebase.database().ref(resource).update(data)
        } catch(err) {
          errorAlert(this.props.alert,'更新失敗 : ' + err.toString())
        } finally {
          this.goBack()
        }
      })
    }

    confirmDelete = (key) => {
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
          this.goBack()
        }
      })      
    }

    goBack = () => {
      this.props.history.goBack()
    }

    gotToAccount = (key) => {
      this.props.history.push('/'+ resource + '/account/' + key)
    }

    gotToPassword = (key) => {
      this.props.history.push('/'+ resource + '/password/' + key)
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
              title={title}
              data={this.state.data}
              onClickTableReturnButton={this.goBack}
              onClickEditConfirmButton={this.onClickEditConfirmButton}
              onClickAccount={this.gotToAccount}
              onClickPassword={this.gotToPassword}
              confirmDelete={this.confirmDelete}
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