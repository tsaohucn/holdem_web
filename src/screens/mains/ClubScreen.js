// node_module
import React from 'react';
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class ClubScreen extends React.Component {

  render() {
    return(
      <h1>{'ClubScreen'}</h1>
    )
  }
}

ClubScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(ClubScreen);