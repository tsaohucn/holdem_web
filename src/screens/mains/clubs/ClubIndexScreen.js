// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import { observer } from 'mobx-react'
import withSearch from '../../../hocs/withSearch'
import withHoldemBar from '../../../hocs/withHoldemBar'
import HoldemStore from '../../../mobx/HoldemStore'

const ClubIndexScreen = withSearch({
	resource: 'clubs',
	searchTitle: '俱樂部查詢',
	leftButtonTitle: '搜索',
	rightButtonTitle: '新增俱樂部',
})

export default withHoldemBar(withAlert((ClubIndexScreen)))