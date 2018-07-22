// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const edit = {
  key: "edit",
  label: "編輯"
}

const EmployeeTableScreen = withTable({
  title: ui.employeesTable.concat(edit),
  resource: 'employees'
})

export default withHoldemBar(withAlert((EmployeeTableScreen)))