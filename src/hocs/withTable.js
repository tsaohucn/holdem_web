// node_module
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import TableView from '../views/TableView'
import firebase from '../configs/firebase'

function withTable(params) {
  const {
    title,
    resource,
    wrapperComponent,
    auth
  } = params ? params : {}

  return class extends React.PureComponent {

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
        loadingState: '下載資料中',
        data: {}
      }
      this.paths = this.props.location.pathname.split("/")
      this.id = this.props.match.params.id
    }

    componentDidMount() {
      if (this.paths.includes('table') || this.paths.includes('edit')) {
        if (this.id === '$all') {
          this.fetchTableData(firebase.database().ref(resource))
        } else {
          this.fetchTableData(firebase.database().ref(resource).orderByChild('id').equalTo(this.id))
        }
      } else {
        this.fetchTableData(firebase.database().ref('members').orderByChild(resource).equalTo(this.id))
      }
    }

    fetchTableData = async (fetch) => {
      let data = {}
      try {
        const snap = fetch && (await fetch.once('value'))
        data = (snap && snap.val()) || {}
      } catch(err) {
        this.props.alert.show('下載失敗 : ' + err.toString())
      } finally {
        this.setState({
          isLoading: false,
          loadingState: '下載資料中',
          data 
        })        
      }      
    }

    onClickEditConfirmButton = (data) => {
      this.setState({
        isLoading: true,
        loadingState: '上傳資料中'
      },async () => {
        try {
          await firebase.database().ref(resource).update(data)
        } catch(err) {
          this.props.alert.show('上傳失敗 : ' + err.toString())
        } finally {
          this.goToTable()
        }
      })
    }

    goBack = () => {
      if (this.paths.includes('table')) {
        this.props.history.push('/' + resource + '/index')
      } else {
        this.props.history.goBack()
      }
    }

    goToMember = (id) => {
      this.props.history.push('/' + resource + '/member/' + id)
    }

    goToEdit = () => {
      this.props.history.push('/' + resource + '/edit/' + this.id)
    }

    goToTable = () => {
      this.props.history.push('/' + resource + '/table/' + this.id)
    }

    gotToSecret = () => {
      this.props.history.push('/clubs/secret')
    }

    render() {
      const Component = wrapperComponent ? wrapperComponent : TableView
      return(
        <div 
          style={styles.container} 
        >
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <CircularProgress size={50}/>
              <h3>{this.state.loadingState}</h3>
            </div>
            :
            <Component
              {...this.props}
              title={title}
              data={this.state.data}
              onClickTableReturnButton={this.goBack}
              onClickMemberCountLink={this.goToMember}
              onClickEditLink={this.goToEdit}
              onClickEditConfirmButton={this.onClickEditConfirmButton}
              onClickSecret={this.gotToSecret}
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