// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'
import OnlySearchPage from '../../../components/OnlySearchPage'

const TableIndexScreen = withSearch({
  resource: 'tables',
  wrapperComponent: OnlySearchPage,
  searchTitle: '桌次編號',
  leftButtonTitle: '搜索'
})

export default withNavigation(withAlert((TableIndexScreen)))