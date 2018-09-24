import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const edit = {
  key: "edit",
  label: "編輯"
}

const MemberTableScreen = withTable({
  title: ui.membersTable.concat(edit),
  resource: 'members'
})

export default withNavigation(withAlert((MemberTableScreen)))