import React from 'react'
import { withAlert } from 'react-alert'
import { inject, observer } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withForm from '../../../hocs/withForm'
import ui from '../../../configs/ui'

const SalesNewScreen = withForm({
    field: ui.salesField,
    buttonTitle: '送出',
    resource: 'sales',
    belong: ['club']
})

export default inject('HoldemStore')(withNavigation(withAlert((SalesNewScreen))))