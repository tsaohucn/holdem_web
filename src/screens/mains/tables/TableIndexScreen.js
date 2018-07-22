// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withSearch from '../../../hocs/withSearch'
import withHoldemBar from '../../../hocs/withHoldemBar'

const TableIndexScreen = () => (
  <h1>桌次現況</h1>
)

export default withHoldemBar(withAlert((TableIndexScreen)))