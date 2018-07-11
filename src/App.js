// node module
import React, { Component } from 'react';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// local components
import Router from './Router'

// optional cofiguration
const options = {
  position: 'bottom center',
  offset: '30px',
}

class App extends Component {
  render() {
    return (
 	    <AlertProvider template={AlertTemplate} {...options}>
       <Router/>
      </AlertProvider>
    );
  }
}

export default App;
