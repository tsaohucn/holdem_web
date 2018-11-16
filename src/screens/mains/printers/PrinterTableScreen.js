import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withPrinter from '../../../hocs/withPrinter'
import ui from '../../../configs/ui'

export default inject('HoldemStore','db')(withNavigation(withAlert((withPrinter({
  resource: 'printers',
  title: ui.printersTable
})))))