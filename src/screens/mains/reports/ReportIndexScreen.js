// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSearch from '../../../hocs/withSearch'
import withNavigation from '../../../hocs/withNavigation'
import ReportPageComponent from '../../../components/ReportPageComponent'


export default withNavigation(withAlert(withSearch({
  buttonTitle: '搜尋',
  wrapperComponent: ReportPageComponent
})))