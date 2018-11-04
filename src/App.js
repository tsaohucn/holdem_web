// node module
import React, { Component } from 'react'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'mobx-react'
import firebase from './configs/firebase'
// local components
import Router from './Router'
import HoldemStore from './stores/HoldemStore'
// optional cofiguration
const options = {
  position: 'bottom center',
  offset: '30px'
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuth: false,
      user: null
    }
  }

  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Provider
          db={firebase.firestore()}
          HoldemStore={HoldemStore}
        >
          <Router 
            auth={this.state.isAuth}
            user={this.state.user}
          />
        </Provider>
      </AlertProvider>
    )
  }
}

export default App