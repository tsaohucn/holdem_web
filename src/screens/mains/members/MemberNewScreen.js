import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

const MemberNewScreen = withForm({
  field: ui.membersField,
  buttonTitle: '送出',
  resource: 'members',
  belong: ['club','referee','sale']
})

export default withNavigation(withAlert((MemberNewScreen)))