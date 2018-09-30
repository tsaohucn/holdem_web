// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withTable(params) {
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
      try {
        const snap = fetch && (await fetch.once('value'))
        data = (snap && snap.val()) || {}
        await sleep(500)
      } catch(err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        this.setState({
          isLoading: false,
          data 
        })        
      }      
    }

    goBack = () => {
      this.props.history.goBack()
    }

    goToEdit = () => {
      this.props.history.push('/' + resource + '/edit/' + this.id)
    }

    render() {

      const Component = wrapperComponent ? wrapperComponent : PartialTable

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
              onClickEdit={this.goToEdit}
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

export default withTable