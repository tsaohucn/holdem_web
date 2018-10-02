import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withLiveTable from '../../../hocs/withLiveTable'
import ui from '../../../configs/ui'

export default withNavigation(withAlert((withLiveTable({
  title: ui.tablesTable
}))))