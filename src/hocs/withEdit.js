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
    auth,
    belong
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.id = this.props.match.params.id
      this.state = {
        isLoading: true,
        event: '載入中',
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
      let id_names = {}
      try {
        await sleep(500)
        const snap = fetch && (await fetch.once('value'))
        data = (snap && snap.val()) || {}
        const data_arr = Object.values(data) || []
        const resource_keys = belong.map(belongResource => {
          return data_arr.map(ele => {
            return ele[belongResource]
          })
        }).flat()
        const uniq_resource_keys = resource_keys.filter((elem, pos, arr) => {
          return arr.indexOf(elem) == pos
        }) // uniq
        const id_names_promise = uniq_resource_keys.map(key => firebase.database().ref('id_names/' + key).once('value'))
        const id_names_snap = await Promise.all(id_names_promise)
        uniq_resource_keys.forEach((key,index) => {
          id_names[key] = id_names_snap[index].val()
        })
        this.setState({
          isLoading: false,
          data,
          id_names
        }) 
      } catch(err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        //
      }      
    }

    onClickTableConfirmButton = (data) => {
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
          this.setState({
            isLoading: false
          })
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

    goToMemberCount = (key) => {
      this.props.history.push('/' + resource + '/member/' + key)
    }

    gotToId = (key)=> {
      this.props.history.push('/' + resource + '/id/' + key)
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
              onClickTableConfirmButton={this.onClickTableConfirmButton}
              onClickTableReturnButton={this.goBack}
              confirmDelete={this.confirmDelete}
              onClickId={this.gotToId}
              onClickAccount={this.gotToAccount}
              onClickPassword={this.gotToPassword}
              onClickMemberCount={this.goToMemberCount}
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