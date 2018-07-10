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
import firebase from '../configs/firebase'

class WelcomeScreen extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      account: '',
      password:'',
      error: ''
    };
  }

  getValidationState = () => {
    const length = this.state.account.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  setAccount = e => {
    this.setState({ account: e.target.value });
  }

  setPassword = e => {
    this.setState({ password: e.target.value });
  }

  register = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.account,this.state.password)
    .catch((error) => {
      this.setState({
        error: error.toString()
      })
    }) 
  }

  login = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.account,this.state.password)
    .catch((error) => {
      this.setState({
        error: error.toString()
      })
    })
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
	            value={this.state.account}
	            placeholder="輸入帳號"
	            onChange={this.setAccount}
	          />
            <FormControl
              type="text"
              value={this.state.password}
              placeholder="輸入密碼"
              onChange={this.setPassword}
            />
	          <FormControl.Feedback />
	          <HelpBlock>Validation is based on string length.</HelpBlock>
	        </FormGroup>
	      </form>
        <h4>{this.state.error}</h4>
        <div>
          <Button onClick={this.register}>註冊</Button>
          <Button onClick={this.login}>登入</Button>
        </div>
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