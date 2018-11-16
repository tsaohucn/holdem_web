// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'
import PartialButtonGroup from '../../../views/PartialButtonGroup'

export default inject('HoldemStore','db')(withNavigation(withAlert((withSearch({
  resource: 'employees',
  placeholder: '搜尋此俱樂部下所有員工',
  leftButtonTitle: '查看帳號',
  rightButtonTitle: '新增帳號'
})))))