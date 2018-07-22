// node_module
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import TablePage from '../views/TablePage'
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
      this.setPath()
    }

    componentDidMount() {
      if (this.path === 'table' || this.path === 'edit') {
        this.fetchTableData(firebase.database().ref(resource))
      } else {
        const id = this.props.match.params.id || null
        console.log(id)
        this.fetchTableData(firebase.database().ref('members').orderByChild(resource).equalTo(id))
      }
    }

    setPath = () => {
      const paths = this.props.location.pathname.split("/")
      this.path = paths[paths.length - 1]
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
      if (this.path === 'table') {
        this.props.history.push('/mains/' + resource + '/index')
      } else {
        this.props.history.push('/mains/' + resource + '/table')
      }
    }

    onClickMemberCountLink = (id) => {
      this.props.history.push('/mains/' + resource + '/member/' + id)
    }

    onClickEditLink = () => {
      this.props.history.push('/mains/' + resource + '/edit')
    }

    render() {
      const Component = wrapperComponent ? wrapperComponent : TablePage
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