import React from 'react'
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

export default inject("HoldemStore")(withNavigation(withAlert((withTable({
  title: ui.refereeSimpleTable,
  resource: 'referees'
})))))