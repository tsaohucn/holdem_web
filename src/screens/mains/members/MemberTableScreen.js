import React from 'react'
import { withAlert } from 'react-alert'
import { inject, observer } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const edit = {
  key: 'edit',
  label: '編輯'
}

export default inject('HoldemStore')(withNavigation(withAlert((withTable({
  title: ui.membersTable.concat(edit),
  resource: 'members'
})))))