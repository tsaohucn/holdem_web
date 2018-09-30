// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withAccount from '../../../hocs/withAccount'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withAccount({
}))))