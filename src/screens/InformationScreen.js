// node_module
import { withAlert } from 'react-alert'
import { inject } from 'mobx-react'
// local components
import withInformation from '../hocs/withInformation'
import withNavigation from '../hocs/withNavigation'

export default inject('HoldemStore')(withNavigation(withAlert((withInformation({
  resource: 'clubs'
})))))