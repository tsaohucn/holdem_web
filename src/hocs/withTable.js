// node_module
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import TablePage from '../views/TablePage'
import firebase from '../configs/firebase'

function withTable(params) {
  const {
    title,
    resource
  } = params ? params : {}

  return class extends React.PureComponent {

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true
      }
    }

    componentDidMount() {
      this.fetchTableData()
    }

    fetchTableData = async () => {
       const snap = await firebase.database().ref(resource).once('value')
       const tableData = snap.val() || {}
       this.setState({
          isLoading: false,
          tableData 
       })
    }

    onClickTableReturnButton = () => {
      this.props.history.push('/mains/' + resource + '/index')
    }

    onClickEdit = () => {
      this.props.history.push('/mains/' + resource + '/edit')
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
              <h3>{'下載資料中'}</h3>
            </div>
            :
            <TablePage
              {...this.props}
              title={title}
              tableData={this.state.tableData}
              onClickTableReturnButton={this.onClickTableReturnButton}
              onClickEdit={this.onClickEdit}
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