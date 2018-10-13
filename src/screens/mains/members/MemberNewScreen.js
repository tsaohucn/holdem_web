import React from 'react'
import { withAlert } from 'react-alert'
import { inject, observer } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

export default inject('HoldemStore')(withNavigation(withAlert((withForm({
    field: ui.membersField,
    buttonTitle: '送出',
    resource: 'members',
    belong: ['club','referee','sale']
})))))