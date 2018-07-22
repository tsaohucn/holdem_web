// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withSearch from '../../../hocs/withSearch'
import withHoldemBar from '../../../hocs/withHoldemBar'

const ReportIndexScreen = () => (
  <h1>報表</h1>
)

export default withHoldemBar(withAlert((ReportIndexScreen)))