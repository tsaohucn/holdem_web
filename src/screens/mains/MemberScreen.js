// node_module
import React from 'react';
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class MemberScreen extends React.Component {

  render() {
    return(
      <h1>{'MemberScreen'}</h1>
    )
  }
}

MemberScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(MemberScreen);