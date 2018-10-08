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
      this.id = this.props.match.params.id || ''
      this.key = null
      this.state = {
        isLoading: true,
        event: '載入中',
        data: {}
      }
    }

    componentDidMount() {
      this.fetchTableData(firebase.database().ref(resource).orderByChild('id').equalTo(this.id))
    }


    fetchTableData = async (fetch) => {
      try {
        await sleep(500)
        const optionsPromise = belong.map(belongResource => firebase.database().ref(belongResource + 's').once('value'))
        const optionsSnap = await Promise.all(optionsPromise)
        let options = {}
        optionsSnap.forEach((snap,index) => {
          const val = snap.val()
          const keys = Object.keys(val || [])
          const option = keys.map(key => {
            return({
              id: val[key].id,
              id_name: val[key].id + ' : ' + val[key].name
            })
          })
          options[belong[index] + '_id'] = option
        })
        const snap = fetch && (await fetch.once('value'))
        const val = (snap && snap.val()) || {}
        const data = Object.values(val)[0] || {}
        this.key = Object.keys(val)[0] || null
        this.setState({
          isLoading: false,
          data,
          ...options
        }) 
      } catch(err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        //
      }      
    }

    updateData = (data) => {
      this.setState({
        isLoading: true,
        event: '更新資料中'
      },async () => {
        try {
          await sleep(500)
          await firebase.database().ref(resource + '/' + this.key).update(data)
          successAlert(this.props.alert,'更新成功')
          this.setState({
            isLoading: false,
            data
          })
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
/*
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
*/
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
              onClickEditReturnButton={this.goBack}
              onClickEditConfirmButton={this.updateData}
              //onClickAccount={this.gotToAccount}
              //onClickPassword={this.gotToPassword}
              //confirmDelete={this.deleteTableData}
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