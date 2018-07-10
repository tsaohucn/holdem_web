// node_module
import React, { Component } from 'react';
import {
  Redirect
} from "react-router-dom";
// local components
import logo from '../logo.svg';
import '../App.css';
import firebase from '../configs/firebase'

class SessionScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuth: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/mains/function')
      } else {
        this.props.history.push('/welcome')
      }
    })
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {'連結firebase判斷是否登入'}
        </p>
      </div>
    );
  }
}

export default SessionScreen;

/*

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {'連結firebase判斷是否登入'}
        </p>
      </div>
    );
*/