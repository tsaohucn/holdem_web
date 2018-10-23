// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const more = [
  {
    'key': 'employeeCount',
    'label': '所含員工數'
  },
  {
    'key': 'refereeCount',
    'label': '所含裁判數'
  },
  {
    'key': 'saleCount',
    'label': '所含業務數'
  },
  {
    'key': 'memberCount',
    'label': '所含成員數'
  },
  {
    key: 'edit',
    label: '編輯'
  }
]

export default inject('HoldemStore')(withNavigation(withAlert((withTable({
  title: ui.clubsTable.concat(more),
  resource: 'clubs'
})))))