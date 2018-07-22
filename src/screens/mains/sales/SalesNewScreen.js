import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const SalesNewScreen = withField({
  field: ui.salesField,
  buttonTitle: '送出',
  resource: 'sales',
  optionResource: 'clubs'
})

export default withHoldemBar(withAlert((SalesNewScreen)))