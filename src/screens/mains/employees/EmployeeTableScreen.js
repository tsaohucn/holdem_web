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

export default withNavigation(withAlert((withTable({
  title: ui.employeesTable.concat(edit),
  resource: 'employees',
  belong: []
}))))