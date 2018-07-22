// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withSearch from '../../../hocs/withSearch'
import withHoldemBar from '../../../hocs/withHoldemBar'

const MemberIndexScreen = withSearch({
  resource: 'members',
  searchTitle: '依會員姓名查詢',
  leftButtonTitle: '搜尋',
  rightButtonTitle: '新增會員',
  secondBarTitle: '依裁判代號查詢',
  secondButtonTitle: '搜尋',
  showSecondSearchBar: true
})

export default withHoldemBar(withAlert((MemberIndexScreen)))