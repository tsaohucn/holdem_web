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

class ClubEditScreen extends PureComponent {

	render() {
		return(
      <h1>ClubEditScreen</h1>
		)
	}
}

export default withHoldemBar(withAlert((ClubEditScreen)))