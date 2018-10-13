// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withReport from '../../../hocs/withReport'
import withNavigation from '../../../hocs/withNavigation'
import ui from '../../../configs/ui'

export default withNavigation(withAlert(withReport({
    title: ui.saleReportTable,
    resource: 'sales',
    belong: []
})))