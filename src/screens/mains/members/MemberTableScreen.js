import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withNavigation from '../../../hocs/withNavigation'
import withTable from '../../../hocs/withTable'
import ui from '../../../configs/ui'

const edit = {
  key: 'edit',
  label: '編輯'
}

export default inject('HoldemStore','db')(withNavigation(withAlert((withTable({
  resource: 'members',
  title: ui.membersTable.concat(edit)
})))))