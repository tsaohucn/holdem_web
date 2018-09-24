import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

const RefereeIndexScreen = withSearch({
	resource: 'referees',
	searchTitle: '依裁判代號查詢',
	leftButtonTitle: '搜尋',
	rightButtonTitle: '新增裁判'
})

export default withNavigation(withAlert((RefereeIndexScreen)))