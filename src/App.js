// node module
import React, { Component } from 'react';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// local components
import Router from './Router'
import firebase from './configs/firebase'

// optional cofiguration
const options = {
  position: 'bottom center',
  offset: '30px',
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuth: 'init'
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true
        })
      } else {
        this.setState({
          isAuth: false
        })
      }
    })
  }

  render() {
    return (
 	    <AlertProvider template={AlertTemplate} {...options}>
        <Router auth={this.state.isAuth}/>
      </AlertProvider>
    );
  }
}

export default App;
