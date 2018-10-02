// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withTable from '../../../hocs/withTable'
import withNavigation from '../../../hocs/withNavigation'
import ui from '../../../configs/ui'

export default withNavigation(withAlert(withTable({
  title: ui.saleReportTable,
  resource: 'clubs',
  belong: []
})))