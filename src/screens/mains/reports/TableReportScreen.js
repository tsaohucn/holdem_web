// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withReport from '../../../hocs/withReport'
import withNavigation from '../../../hocs/withNavigation'
import ui from '../../../configs/ui'

export default inject('HoldemStore','db')(withNavigation(withAlert(withReport({
  resource: 'players_reports',
  title: ui.memberReportTable,
  by: 'table_id'
}))))