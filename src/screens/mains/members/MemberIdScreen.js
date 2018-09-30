import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withChangeId from '../../../hocs/withChangeId'
import ui from '../../../configs/ui'

export default withNavigation(withAlert((withChangeId({
  resource: 'members',
  originalLabel: '請輸入原始編號',
  newLabel: '請輸入新編號'
}))))