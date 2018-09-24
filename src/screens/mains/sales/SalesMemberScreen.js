import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const SalesMemberScreen = withTable({
  title: ui.specificMembersTable,
  resource: 'sales',
})

export default withNavigation(withAlert((SalesMemberScreen)))