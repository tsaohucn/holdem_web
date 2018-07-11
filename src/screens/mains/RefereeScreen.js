// node_module
import React from 'react';
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class RefereeScreen extends React.Component {

  render() {
    return(
      <h1>{'RefereeScreen'}</h1>
    )
  }
}

RefereeScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(RefereeScreen);