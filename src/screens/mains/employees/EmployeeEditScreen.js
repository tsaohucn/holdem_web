import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withTable from '../../../hocs/withTable'
import EditComponent from '../../../components/EditComponent'
import ui from '../../../configs/ui'

const _delete = {
  key: "delete",
  label: "刪除"
}

const EmployeeEditScreen = withTable({
  title: ui.employeesTable.concat(_delete),
  resource: 'employees',
  wrapperComponent: EditComponent
})

export default withHoldemBar(withAlert((EmployeeEditScreen)))