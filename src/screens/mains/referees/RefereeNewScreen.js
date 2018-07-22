import React from 'react'
import { withAlert } from 'react-alert'
import withHoldemBar from '../../../hocs/withHoldemBar'
import withNew from '../../../hocs/withNew'
import ui from '../../../configs/ui'

const RefereeNewScreen = withNew({
  field: ui.refereeField,
  buttonTitle: '確認新增裁判',
  resource: 'referees'
})

export default withHoldemBar(withAlert((RefereeNewScreen)))