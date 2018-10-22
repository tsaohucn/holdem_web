import React from 'react'
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withLive from '../../../hocs/withLive'
import ui from '../../../configs/ui'

export default inject('HoldemStore')(withNavigation(withAlert((withLive({
  resource: 'players',
  title: ui.playersTable
})))))