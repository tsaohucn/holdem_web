// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const ClubNewScreen = withField({
  field: ui.clubsField,
  buttonTitle: '送出',
  resource: 'clubs'
})

export default withHoldemBar(withAlert((ClubNewScreen)))