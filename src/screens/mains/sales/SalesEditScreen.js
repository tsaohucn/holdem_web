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

const SalesEditScreen = withTable({
  title: ui.salesTable.concat(_delete),
  resource: 'sales',
  wrapperComponent: EditComponent
})

export default withHoldemBar(withAlert((SalesEditScreen)))