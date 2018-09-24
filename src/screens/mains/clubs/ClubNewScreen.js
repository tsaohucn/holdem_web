// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

export default withNavigation(withAlert((withForm({
  field: ui.clubsField,
  buttonTitle: '送出',
  resource: 'clubs',
  belong: []
}))))