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

class ClubNewScreen extends PureComponent {

  onClickNewPageButton = () => {
  	// do something
    this.props.history.push('/mains/clubs/index')
  }

  onClickNewPageReturn = () => {
    this.props.history.push('/mains/clubs/index') // goBack
  }

	render() {
		return(
		  <NewPage
		   {...this.props}
		   field={ui.clubField}
		   buttonTitle={'確認新增俱樂部'}
		   onClickNewPageButton={this.onClickNewPageButton}
		   onClickNewPageReturn={this.onClickNewPageReturn}
		  />
		)
	}
}

export default withHoldemBar(withAlert((ClubNewScreen)))