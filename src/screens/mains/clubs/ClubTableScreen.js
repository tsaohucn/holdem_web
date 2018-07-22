// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const ClubTableScreen = withTable({
  title: ui.clubTable,
  resource: 'clubs'
})

export default withHoldemBar(withAlert((ClubTableScreen)))