import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const _delete = {
  key: "delete",
  label: "刪除"
}

export default withNavigation(withAlert((withTable({
  title: ui.memberCountTable,
  resource: 'members',
  by: 'refereeId'
}))))