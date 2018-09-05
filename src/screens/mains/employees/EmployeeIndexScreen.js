// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withSearch from '../../../hocs/withSearch'
import withHoldemBar from '../../../hocs/withHoldemBar'
import ButtonSearchPage from '../../../views/ButtonSearchPage'

const EmployeeIndexScreen = withSearch({
  resource: 'employees',
  wrapperComponent: ButtonSearchPage,
  leftButtonTitle: '查看帳號',
  rightButtonTitle: '新增帳號',
})

export default withHoldemBar(withAlert((EmployeeIndexScreen)))