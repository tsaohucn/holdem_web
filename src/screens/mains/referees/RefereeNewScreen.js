import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const RefereeNewScreen = withField({
  field: ui.refereesField,
  buttonTitle: '送出',
  resource: 'referees',
  belong: ['club']
})

export default withNavigation(withAlert((RefereeNewScreen)))