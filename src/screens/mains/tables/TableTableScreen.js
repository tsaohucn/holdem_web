import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withLive from '../../../hocs/withLive'
import ui from '../../../configs/ui'

export default withNavigation(withAlert((withLive({
    title: ui.tablesTable
}))))