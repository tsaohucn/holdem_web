// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const ClubNewScreen = withField({
  field: ui.clubsField,
  buttonTitle: '送出',
  resource: 'clubs'
})

export default withNavigation(withAlert((ClubNewScreen)))