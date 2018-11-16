// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

export default inject('HoldemStore','db')(withNavigation(withAlert((withSearch({
  resource: 'players',
  searchTitle: '桌次編號',
  placeholder: '輸入桌次編號查詢，或無內容直接搜尋全部',
  leftButtonTitle: '搜索'
})))))