import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const MemberNewScreen = withField({
  field: ui.membersField,
  buttonTitle: '送出',
  resource: 'members',
  belong: ['club','referee','sale']
})

export default withHoldemBar(withAlert((MemberNewScreen)))