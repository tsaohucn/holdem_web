// node module
import React, { Component } from 'react';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// local components
import Router from './Router'
import firebase from './configs/firebase'
import HoldemStore from './mobx/HoldemStore'

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
        firebase.database().ref('/users/' + user.uid).once('value').then((snap) => {
          HoldemStore.setUser(snap.val())
          this.setState({
            isAuth: true
          })
        }).catch(err => {
          HoldemStore.setUser(null)
          this.setState({
            isAuth: true
          })          
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
        <Router 
          auth={this.state.isAuth}
        />
      </AlertProvider>
    );
  }
}

export default App;
