import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
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

export default inject('HoldemStore')(withNavigation(withAlert((RefereeNewScreen))))