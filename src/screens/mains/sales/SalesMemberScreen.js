import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const SalesMemberScreen = withTable({
  title: ui.specificMembersTable,
  resource: 'sales',
})

export default withHoldemBar(withAlert((SalesMemberScreen)))