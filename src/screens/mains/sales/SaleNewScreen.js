import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

export default inject('HoldemStore','db')(withNavigation(withAlert((withForm({
  field: ui.salesField,
  buttonTitle: '送出',
  resource: 'sales',
  belong: ['club']
})))))