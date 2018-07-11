// node_module
import React from 'react';
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class LiveScreen extends React.Component {

  render() {
    return(
      <h1>{'LiveScreen'}</h1>
    )
  }
}

LiveScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(LiveScreen);