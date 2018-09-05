// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withSearch from '../../../hocs/withSearch'
import withHoldemBar from '../../../hocs/withHoldemBar'
import OnlySearchPage from '../../../views/OnlySearchPage'

const TableIndexScreen = withSearch({
  resource: 'tables',
  wrapperComponent: OnlySearchPage,
  searchTitle: '桌次編號',
  leftButtonTitle: '搜索'
})

export default withHoldemBar(withAlert((TableIndexScreen)))