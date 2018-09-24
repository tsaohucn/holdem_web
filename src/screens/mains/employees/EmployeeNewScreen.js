// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

const EmployeeNewScreen = withForm({
  field: ui.employeesField,
  buttonTitle: '送出',
  resource: 'employees',
  belong: []
})

export default withNavigation(withAlert((EmployeeNewScreen)))