// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withChangePassword from '../../../hocs/withChangePassword'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withChangePassword({
}))))