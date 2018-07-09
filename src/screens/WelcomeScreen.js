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
// local components
import logo from '../logo.svg';
import '../App.css';

class WelcomeScreen extends Component {

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
            <h1 style={{textAlign: 'center'}}>驗證帳密</h1>
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
        <Button onClick={() => {this.props.history.push('/mains/function')}}>登入</Button>
        <AuthButton/>
      </Grid>
    );
  }
}

export default WelcomeScreen;

const AuthButton = withRouter(
  ({ history }) =>
    <Button
      onClick={() => {history.push('/mains/function')}}
    >
      登入
    </Button>
);

const height = window.innerHeight

const styles = {
	gird: {
		height: height
	}
}