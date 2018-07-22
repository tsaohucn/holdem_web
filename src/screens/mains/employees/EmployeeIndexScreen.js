// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withIndex from '../../../hocs/withIndex'
import withHoldemBar from '../../../hocs/withHoldemBar'
import ButtonSearchPage from '../../../views/ButtonSearchPage'

const EmployeeIndexScreen = withIndex({
  resource: 'employees',
  wrapperComponent: ButtonSearchPage
})

export default withHoldemBar(withAlert((EmployeeIndexScreen)))