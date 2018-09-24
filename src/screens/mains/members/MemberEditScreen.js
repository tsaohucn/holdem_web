import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import EditComponent from '../../../components/EditComponent'
import ui from '../../../configs/ui'

const _delete = {
  key: "delete",
  label: "刪除"
}

const MemberEditScreen = withTable({
  title: ui.membersTable.concat(_delete),
  resource: 'members',
  wrapperComponent: EditComponent
})

export default withNavigation(withAlert((MemberEditScreen)))