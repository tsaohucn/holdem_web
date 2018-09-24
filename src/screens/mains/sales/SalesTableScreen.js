// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const edit = {
  key: "edit",
  label: "編輯"
}

const SalesTableScreen = withTable({
  title: ui.salesTable.concat(edit),
  resource: 'sales'
})

export default withNavigation(withAlert((SalesTableScreen)))