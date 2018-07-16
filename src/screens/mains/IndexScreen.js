// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class IndexScreen extends React.Component {

  render() {
    return(
      null
      /*
      <img style={{flex: 1}} src={image}/>
      */
    )
  }
}

export default withAlert(withHoldemBar(IndexScreen))