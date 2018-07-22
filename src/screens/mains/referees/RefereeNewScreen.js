import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const RefereeNewScreen = withField({
  field: ui.refereesField,
  buttonTitle: '送出',
  resource: 'referees',
  optionResource: ['clubs']
})

export default withHoldemBar(withAlert((RefereeNewScreen)))