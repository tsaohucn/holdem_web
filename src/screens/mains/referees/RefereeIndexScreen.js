// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withIndex from '../../../hocs/withIndex'
import withHoldemBar from '../../../hocs/withHoldemBar'

const RefereeIndexScreen = withIndex({
	resource: 'referees',
	searchTitle: '裁判代號查詢',
	leftButtonTitle: '搜索全部裁判',
	rightButtonTitle: '新增裁判'
})

export default withHoldemBar(withAlert((RefereeIndexScreen)))