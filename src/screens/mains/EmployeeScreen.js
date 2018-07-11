// node_module
import React from 'react';
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class EmployeeScreen extends React.Component {

  render() {
    return(
      <h1>{'EmployeeScreen'}</h1>
    )
  }
}

EmployeeScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(EmployeeScreen);