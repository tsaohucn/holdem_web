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

const RefereeTableScreen = withTable({
  title: ui.refereeTable.concat(edit),
  resource: 'referees'
})

export default withHoldemBar(withAlert((RefereeTableScreen)))