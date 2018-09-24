import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withEdit from '../../../hocs/withEdit'
import ui from '../../../configs/ui'

const _delete = {
  key: "delete",
  label: "刪除"
}

export default withNavigation(withAlert((withEdit({
  title: ui.refereesTable.concat(_delete),
  resource: 'referees'
}))))