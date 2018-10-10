// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const more = [
  {
    "key": "employeeCount",
    "label": "所含員工數"
  },
  {
    "key": "refereeCount",
    "label": "所含裁判數"
  },
  {
    "key": "saleCount",
    "label": "所含業務數"
  },
  {
    "key": "memberCount",
    "label": "所含成員數"
  },
  {
    key: "edit",
    label: "編輯"
  }
]

const ClubTableScreen = withTable({
  title: ui.clubsTable.concat(more),
  resource: 'clubs'
})

export default withNavigation(withAlert((ClubTableScreen)))