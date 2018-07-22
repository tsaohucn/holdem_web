// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withAlert } from 'react-alert'
// local components
// hocs
import contentCompose from '../../../hocs/contentCompose'
import withHoldemBar from '../../../hocs/withHoldemBar'

import NewPage from '../../../components/NewPage'
import SearchPage from '../../../views/SearchPage'
import TablePage from '../../../views/TablePage'
// tools
import ui from '../../../configs/ui'
import firebase from '../../../configs/firebase'

class ClubTableScreen extends PureComponent {

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
		 const snap = await firebase.database().ref('clubs').once('value')
     const tableData = snap.val() || {}
     this.setState({
        isLoading: false,
        tableData 
     })
	}

	onClickTableReturnButton = () => {
		this.props.history.push('/mains/clubs/index')
	}

	onClickEdit = () => {
		this.props.history.push('/mains/clubs/edit')
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
				    title={ui.clubTable.concat(edit)}
				    tableData={this.state.tableData}
				    onClickTableReturnButton={this.onClickTableReturnButton}
				    onClickEdit={this.onClickEdit}
				  />
				}
			</div>
		)
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

const edit = {
  key: "edit",
  label: "編輯"
}

export default withHoldemBar(withAlert((ClubTableScreen)))