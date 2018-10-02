// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withReport from '../../../hocs/withReport'
import withNavigation from '../../../hocs/withNavigation'


export default withNavigation(withAlert(withReport({

})))