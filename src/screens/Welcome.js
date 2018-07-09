// node module
import React, { Component } from 'react';
import { 
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
// local components
import logo from '../logo.svg';
import '../App.css';

class Welcome extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
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
	      <form>
	        <FormGroup
	          controlId="formBasicText"
	          validationState={this.getValidationState()}
	        >
	          <ControlLabel>Working example with validation</ControlLabel>
	          <FormControl
	            type="text"
	            value={this.state.value}
	            placeholder="Enter text"
	            onChange={this.handleChange}
	          />
	          <FormControl.Feedback />
	          <HelpBlock>Validation is based on string length.</HelpBlock>
	        </FormGroup>
	      </form>
      </Grid>
    );
  }
}

export default Welcome;

const height = window.innerHeight

const styles = {
	gird: {
		height: height
	}
}