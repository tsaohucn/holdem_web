import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const RefereeMemberScreen = withTable({
  title: ui.specificMembersTable,
  resource: 'referees',
})

export default withNavigation(withAlert((RefereeMemberScreen)))