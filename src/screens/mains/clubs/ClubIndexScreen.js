// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withIndex from '../../../hocs/withIndex'
import withHoldemBar from '../../../hocs/withHoldemBar'

const ClubIndexScreen = withIndex({
	resource: 'clubs',
	searchTitle: '俱樂部查詢',
	leftButtonTitle: '搜索全部俱樂部',
	rightButtonTitle: '新增俱樂部'
})

export default withHoldemBar(withAlert((ClubIndexScreen)))