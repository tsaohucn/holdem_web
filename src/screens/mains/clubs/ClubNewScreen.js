// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

export default inject('HoldemStore')(withNavigation(withAlert((withForm({
  field: ui.clubsField,
  buttonTitle: '送出',
  resource: 'clubs',
  belong: []
})))))