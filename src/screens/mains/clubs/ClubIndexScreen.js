// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withSearch({
  resource: 'clubs',
  searchTitle: '俱樂部查詢',
  placeholder: '輸入俱樂部名稱查詢，或無內容直接搜尋全部',
  leftButtonTitle: '搜索',
  rightButtonTitle: '新增俱樂部',
  showRightButton: true
}))))