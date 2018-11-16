// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

export default inject('HoldemStore','db')(withNavigation(withAlert((withSearch({
  resource: 'sales',
  searchTitle: '依業務代號查詢',
  placeholder: '輸入業務代號查詢，或無內容直接搜尋全部',
  leftButtonTitle: '搜尋',
  rightButtonTitle: '新增業務',
  showRightButton: true
})))))