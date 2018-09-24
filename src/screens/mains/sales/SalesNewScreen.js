import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withField from '../../../hocs/withField'
import ui from '../../../configs/ui'

const SalesNewScreen = withField({
  field: ui.salesField,
  buttonTitle: '送出',
  resource: 'sales',
  belong: ['club']
})

export default withNavigation(withAlert((SalesNewScreen)))