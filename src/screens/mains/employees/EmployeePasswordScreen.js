// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withChangePassword from '../../../hocs/withChangePassword'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withChangePassword({
  originalLabel: '請輸入原始密碼',
  newLabel: '請輸入新密碼',
  resource: 'employees'
}))))