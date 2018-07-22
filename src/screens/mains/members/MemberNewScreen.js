import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const MemberNewScreen = withField({
  field: ui.memberField,
  buttonTitle: '送出',
  resource: 'members',
  optionResource: ['clubs','referees','sales']
})

export default withHoldemBar(withAlert((MemberNewScreen)))