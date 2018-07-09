// node_module
import React, { Component } from 'react';
import {
  Redirect
} from "react-router-dom";
// local components
import logo from '../logo.svg';
import '../App.css';

class Session extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuth: false
    }
  }

  componentDidMount() {
    this.sleep(3000).then(() => {
      this.setState({
        isAuth: true
      })
    })
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  render() {
    if (this.state.isAuth) {
      return <Redirect to={'welcome'} />
    }
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

export default Session;