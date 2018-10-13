// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import { inject, observer } from 'mobx-react'
// local components
import withInformation from '../hocs/withInformation'
import withNavigation from '../hocs/withNavigation'

export default inject('HoldemStore')(withNavigation(withAlert((withInformation({
    resource: 'clubs'
})))))