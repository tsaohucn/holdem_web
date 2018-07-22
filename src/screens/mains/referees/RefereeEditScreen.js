import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withTable from '../../../hocs/withTable'
import EditComponent from '../../../components/EditComponent'
import ui from '../../../configs/ui'

const _delete = {
  key: "delete",
  label: "刪除"
}

const RefereeEditScreen = withTable({
  title: ui.refereeTable.concat(_delete),
  resource: 'referees',
  wrapperComponent: EditComponent
})

export default withHoldemBar(withAlert((RefereeEditScreen)))