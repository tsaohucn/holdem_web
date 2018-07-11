// node_module
import React from 'react';
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class FunctionScreen extends React.Component {

  render() {
    return(
      <h1>{'FunctionScreen'}</h1>
    )
  }
}

FunctionScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(FunctionScreen);