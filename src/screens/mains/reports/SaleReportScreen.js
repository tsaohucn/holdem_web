// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withReport from '../../../hocs/withReport'
import withNavigation from '../../../hocs/withNavigation'
import ui from '../../../configs/ui'

export default inject('HoldemStore')(withNavigation(withAlert(withReport({
  title: ui.saleReportTable,
  resource: 'reports',
  by: 'club_id_sale_id'
}))))