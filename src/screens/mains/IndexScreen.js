// node_module
import { withAlert } from 'react-alert'
// local components
import withNavigation from '../../hocs/withNavigation'

const IndexScreen = () => null

export default withAlert(withNavigation(IndexScreen))