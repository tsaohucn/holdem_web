// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withPassword from '../../../hocs/withPassword'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withPassword({
}))))