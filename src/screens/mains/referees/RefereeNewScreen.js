import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

const RefereeNewScreen = withForm({
  field: ui.refereesField,
  buttonTitle: '送出',
  resource: 'referees',
  belong: ['club']
})

export default withNavigation(withAlert((RefereeNewScreen)))