// node_module
import React from 'react';
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class ReportScreen extends React.Component {

  render() {
    return(
      <h1>{'ReportScreen'}</h1>
    )
  }
}

ReportScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(ReportScreen);