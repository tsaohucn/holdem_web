import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withMember from '../../../hocs/withMember'
import ui from '../../../configs/ui'

const _delete = {
  key: "delete",
  label: "刪除"
}

export default withNavigation(withAlert((withMember({
  title: ui.memberCountTable,//.concat(_delete),
  resource: 'referee',
}))))