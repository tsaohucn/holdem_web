// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

const ClubIndexScreen = withSearch({
	resource: 'clubs',
	searchTitle: '俱樂部查詢',
	leftButtonTitle: '搜索',
	rightButtonTitle: '新增俱樂部',
})

export default withNavigation(withAlert((ClubIndexScreen)))