// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const edit = {
  key: "edit",
  label: "編輯"
}

const ClubTableScreen = withTable({
  title: ui.clubTable.concat(edit),
  resource: 'clubs'
})

export default withHoldemBar(withAlert((ClubTableScreen)))