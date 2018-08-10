// node module
import React from 'react'
import withHoldemBar from '../hocs/withHoldemBar'

const NoAuthScreen = () => (
  <h1>{'沒有權限'}</h1>
)

export default withHoldemBar(NoAuthScreen)