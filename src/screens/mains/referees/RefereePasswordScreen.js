// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withChange from '../../../hocs/withChange'
import withNavigation from '../../../hocs/withNavigation'

export default withNavigation(withAlert((withChange({
  originalLabel: '請輸入原始密碼',
  newLabel: '請輸入新密碼'
}))))