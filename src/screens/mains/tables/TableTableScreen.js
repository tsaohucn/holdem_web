import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const edit = {
  key: "edit",
  label: "編輯"
}

const MemberTableScreen = withTable({
  title: ui.tablesTable.concat(edit),
  resource: 'tables'
})

export default withHoldemBar(withAlert((MemberTableScreen)))