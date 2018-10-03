// node module
import React, { Component } from 'react'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'mobx-react'
// local components
import Router from './Router'
import firebase from './configs/firebase'
import HoldemStore from './mobx/HoldemStore'

// optional cofiguration
const options = {
  position: 'bottom center',
  offset: '30px',
}

const stores = {
  HoldemStore: new HoldemStore(),
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuth: false,
      user: null
    }
  }

  componentDidMount() {
    //firebase.database().ref('/users').orderByChild('account').equalTo()
    /*
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('/users/' + user.uid +'/resource').once('value').then((snap) => {
          this.setState({
            isAuth: true,
            user: snap.val()
          })
        }).catch(err => {
          this.setState({
            isAuth: true,
            user: null
          })          
        })
      } else {
        this.setState({
          isAuth: false,
          user: null
        })
      }
    })
    */
  }

  render() {
    return (
 	    <AlertProvider template={AlertTemplate} {...options}>
        <Provider
          {...stores}
          >
          <Router 
            auth={this.state.isAuth}
            user={this.state.user}
          />
        </Provider>
      </AlertProvider>
    );
  }
}

export default App;
