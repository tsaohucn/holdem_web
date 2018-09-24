// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withSearch({
  resource: 'members',
  searchTitle: '依會員姓名查詢',
  placeholder: '輸入會員姓名查詢，或無內容直接搜尋全部',
  secondPlaceholder: '輸入裁判代號查詢，或無內容直接搜尋全部',
  leftButtonTitle: '搜尋',
  rightButtonTitle: '新增會員',
  secondBarTitle: '依裁判代號查詢',
  secondButtonTitle: '搜尋',
  showSecondSearchBar: true,
  showRightButton: true
}))))