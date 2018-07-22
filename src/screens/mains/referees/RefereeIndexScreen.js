import React from 'react'
import { withAlert } from 'react-alert'
import withIndex from '../../../hocs/withIndex'
import withHoldemBar from '../../../hocs/withHoldemBar'

const RefereeIndexScreen = withIndex({
	resource: 'referees',
	searchTitle: '依裁判代號查詢',
	leftButtonTitle: '搜尋',
	rightButtonTitle: '新增裁判'
})

export default withHoldemBar(withAlert((RefereeIndexScreen)))