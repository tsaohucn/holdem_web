// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import ChangeComponent from '../components/ChangeComponent'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withChangePassword(params) {
  const {
    resource,
    originalLabel,
    newLabel
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.id = this.props.match.params.id
      this.state = {
        isLoading: false,
        event: '載入中'
      }
    }

    onClickConfirmButton = (value) => {
      if (resource !== 'employees') { //employees 再改
        this.setState({
          isLoading: true,
          event: '更新中'        
        },async () => {
          try {
            const backends_update = {
              password: value
            }
            await firebase.database().ref(resource + '/' + this.id).update(backends_update)
            await firebase.database().ref('backends/' + this.id).update(backends_update)
            await sleep(500)
            successAlert(this.props.alert,'更新成功')
            this.goBack()
          } catch(err) {
            errorAlert(this.props.alert,'更新失敗 : ' + err.toString())
          } finally {
            this.setState({
              isLoading: false
            })  
          }
        })
      }
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
              <h3>{this.state.event}</h3>
            </div>
            :
            <ChangeComponent
              {...this.props}
              originalLabel={originalLabel}
              newLabel={newLabel}
              onClickCancelButton={this.goBack}
              onClickConfirmButton={this.onClickConfirmButton}
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


export default withChangePassword