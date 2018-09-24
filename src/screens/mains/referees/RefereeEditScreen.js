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

const RefereeEditScreen = withTable({
  title: ui.refereesTable.concat(_delete),
  resource: 'referees',
  wrapperComponent: EditComponent
})

export default withNavigation(withAlert((RefereeEditScreen)))