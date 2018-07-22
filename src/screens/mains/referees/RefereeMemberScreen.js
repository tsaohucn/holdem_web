import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const RefereeMemberScreen = withTable({
  title: ui.specificMembersTable,
  resource: 'referees',
})

export default withHoldemBar(withAlert((RefereeMemberScreen)))