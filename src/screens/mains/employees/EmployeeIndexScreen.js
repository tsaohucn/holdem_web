// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'
import ButtonGroup from '../../../views/ButtonGroup'

const EmployeeIndexScreen = withSearch({
  resource: 'employees',
  wrapperComponent: ButtonGroup,
  leftButtonTitle: '查看帳號',
  rightButtonTitle: '新增帳號',
})

export default withNavigation(withAlert((EmployeeIndexScreen)))