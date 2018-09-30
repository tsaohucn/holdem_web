import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withChange from '../../../hocs/withChange'
import ui from '../../../configs/ui'

export default withNavigation(withAlert((withChange({
  resource: 'sales',
  originalLabel: '請輸入原始編號',
  newLabel: '請輸入新編號'
}))))