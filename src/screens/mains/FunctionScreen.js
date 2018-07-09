// node module
import React, { Component } from 'react';
import { 
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
  Button
} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import {
  withRouter,
  Link
} from "react-router-dom";

class FunctionScreen extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Grid 
        container
        style={styles.gird}
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
       >
         <p>FunctionScreen</p>
      </Grid>
    );
  }
}

export default FunctionScreen;

const height = window.innerHeight

const styles = {
  gird: {
    height: height
  }
}

