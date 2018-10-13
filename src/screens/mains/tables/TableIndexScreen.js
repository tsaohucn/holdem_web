// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withSearch({
    resource: 'tables',
    searchTitle: '桌次編號',
    placeholder: '輸入桌次編號查詢，或無內容直接搜尋全部',
    leftButtonTitle: '搜索'
}))))