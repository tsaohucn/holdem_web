// node_module
import React from 'react';
import { withAlert } from 'react-alert'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class FunctionScreen extends React.Component {

  render() {
    return(
      <h1>{'FunctionScreen'}</h1>
    )
  }
}

export default withAlert(withHoldemBar(FunctionScreen));