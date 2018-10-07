// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const ClubTableScreen = withTable({
  title: ui.clubsTable,
  resource: 'clubs'
})

export default withNavigation(withAlert((ClubTableScreen)))