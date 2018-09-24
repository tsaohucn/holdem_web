// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

const SalesIndexScreen = withSearch({
	resource: 'sales',
	searchTitle: '依業務代號查詢',
	leftButtonTitle: '搜尋',
	rightButtonTitle: '新增業務'
})

export default withNavigation(withAlert((SalesIndexScreen)))