// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withIndex from '../../../hocs/withIndex'
import withHoldemBar from '../../../hocs/withHoldemBar'

const SalesIndexScreen = withIndex({
	resource: 'sales',
	searchTitle: '依業務代號查詢',
	leftButtonTitle: '搜尋',
	rightButtonTitle: '新增業務'
})

export default withHoldemBar(withAlert((SalesIndexScreen)))