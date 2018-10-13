import React from 'react'
import { withAlert } from 'react-alert'
import { inject, observer } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withEdit from '../../../hocs/withEdit'
import ui from '../../../configs/ui'

const _delete = {
  key: "delete",
  label: "刪除"
}

export default inject("HoldemStore")(withNavigation(withAlert((withEdit({
  title: ui.employeesTable.concat(_delete),
  resource: 'employees',
  belong: []
})))))