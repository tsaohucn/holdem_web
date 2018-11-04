// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'
import ButtonGroup from '../../../views/ButtonGroup'

export default inject('HoldemStore','db')(withNavigation(withAlert((withSearch({
  wrapperComponent: ButtonGroup,
  resource: 'employees',
  leftButtonTitle: '查看帳號',
  rightButtonTitle: '新增帳號'
})))))