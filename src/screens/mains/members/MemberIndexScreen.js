// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import { inject, observer } from 'mobx-react'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

export default inject('HoldemStore')(withNavigation(withAlert((withSearch({
  resource: 'members',
  placeholder: '輸入會員查詢內容，或無內容直接搜尋全部',
  leftButtonTitle: '搜尋',
  rightButtonTitle: '新增會員',
  showRadioBox: true,
  showRightButton: true,
  radioOneTitle: '依會員姓名查詢',
  radioTwoTitle: '依裁判代號查詢'
})))))