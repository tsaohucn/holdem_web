// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import { inject, observer } from 'mobx-react'
// local components
import withReport from '../../../hocs/withReport'
import withNavigation from '../../../hocs/withNavigation'
import ui from '../../../configs/ui'

export default inject('HoldemStore')(withNavigation(withAlert(withReport({
  title: ui.memberReportTable,
  resource: 'reports'
}))))