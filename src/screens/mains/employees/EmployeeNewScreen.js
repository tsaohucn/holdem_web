// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const EmployeeNewScreen = withField({
  field: ui.employeesField,
  buttonTitle: '送出',
  resource: 'employees',
  belong: []
})

export default withNavigation(withAlert((EmployeeNewScreen)))