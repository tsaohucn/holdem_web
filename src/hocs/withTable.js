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
    wrapperComponent
  } = params ? params : {}

  return class extends React.PureComponent {

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true
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
          data 
        })        
      }      
    }

    onClickEditConfirmButton = () => {
      
    }

    onClickTableReturnButton = () => {
      if (this.paths.includes('table')) {
        this.props.history.push('/mains/' + resource + '/index')
      } else {
        this.props.history.goBack()
      }
    }

    onClickMemberCountLink = (id) => {
      this.props.history.push('/mains/' + resource + '/member/' + id)
    }

    onClickEditLink = () => {
      this.props.history.push('/mains/' + resource + '/edit/' + this.id)
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
              <h3>{'下載資料中'}</h3>
            </div>
            :
            <Component
              {...this.props}
              title={title}
              data={this.state.data}
              onClickTableReturnButton={this.onClickTableReturnButton}
              onClickMemberCountLink={this.onClickMemberCountLink}
              onClickEditLink={this.onClickEditLink}
              onClickEditConfirmButton={this.onClickEditConfirmButton}
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