// node_module
import React, { PureComponent } from 'react'
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

class ClubIndexScreen extends PureComponent {

	onClickSearchPageRightButton = () => {
		this.props.history.push('/mains/clubs/new')
	}

	onClickSearchPageLeftButton = () => {
		this.props.history.push('/mains/clubs/table')
	}
	
	render() {
		return(
		  <SearchPage
		    {...this.props}
		    title={'俱樂部查詢'}
		    leftButtonTitle='搜索' 
		    rightButtonTitle='新增俱樂部'
		    onClickSearchPageRightButton={this.onClickSearchPageRightButton}
		    onClickSearchPageLeftButton={this.onClickSearchPageLeftButton}
		  />
		)
	}
}

export default withHoldemBar(withAlert((ClubIndexScreen)))