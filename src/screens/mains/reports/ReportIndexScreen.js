// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'

const ReportIndexScreen = () => (
  <h1>報表</h1>
)

export default withNavigation(withAlert((ReportIndexScreen)))