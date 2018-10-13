// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withReportSearch from '../../../hocs/withReportSearch'
import withNavigation from '../../../hocs/withNavigation'


export default withNavigation(withAlert(withReportSearch({
    buttonTitle: '搜尋'
})))