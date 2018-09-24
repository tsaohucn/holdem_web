// node module
import React from 'react'
// local components
import withNavigation from '../hocs/withNavigation'

const NoAuthScreen = () => (
  <h1>{'沒有權限'}</h1>
)

export default withNavigation(NoAuthScreen)