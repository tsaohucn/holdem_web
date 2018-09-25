import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withMember from '../../../hocs/withMember'
import ui from '../../../configs/ui'

export default withNavigation(withAlert((withMember({
  title: ui.specificMembersTable,
  resource: 'referee',
}))))