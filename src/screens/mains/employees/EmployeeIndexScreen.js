// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'
import ButtonGroup from '../../../views/ButtonGroup'

export default withNavigation(withAlert((withSearch({
  wrapperComponent: ButtonGroup,
  resource: 'employees',
  leftButtonTitle: '查看帳號',
  rightButtonTitle: '新增帳號'
}))))