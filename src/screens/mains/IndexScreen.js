// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

const IndexScreen = () => null

export default withAlert(withHoldemBar(IndexScreen))