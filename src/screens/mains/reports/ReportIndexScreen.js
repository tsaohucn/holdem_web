// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withIndex from '../../../hocs/withIndex'
import withHoldemBar from '../../../hocs/withHoldemBar'

const ReportIndexScreen = () => (
  <h1>不一樣</h1>
)

export default withHoldemBar(withAlert((ReportIndexScreen)))