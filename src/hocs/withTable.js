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
    by
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.search = this.props.match.params.search || ''
      this.state = {
        isLoading: true,
        event: '載入中',
        data: []
      }
    }

    componentDidMount() {
      if (this.search === '$all') {
        this.fetchTableData(firebase.database().ref(resource))
      } else {
        this.fetchTableData(firebase.database().ref(resource).orderByChild(by || 'id').equalTo(this.search))
      }
    }

    fetchTableData = async (fetch) => {
      try {
        await sleep(500)
        const snap = fetch && (await fetch.once('value'))
        const val = (snap && snap.val()) || {}
        const data = Object.values(val) || []
        this.setState({
          isLoading: false,
          data
        }) 
      } catch(err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        //
      }      
    }

    goToCountTable = (key,id) => {
      this.props.history.push('/' + resource + '/table/' + key + '/' + id)
    }

    goToEditPage = (id) => {
      this.props.history.push('/' + resource + '/table/edit/' + id)
    }

    goBack = () => {
      this.props.history.goBack()
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
              {...this.state}
              title={title}
              onClickTableReturnButton={this.goBack}
              onClickCount={this.goToCountTable}
              onClickEdit={this.goToEditPage}
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