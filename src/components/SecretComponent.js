import React, { Component } from 'react'

class SecretComponent extends Component {

  render() {
    return(
      <div>
        <h1>{this.props.test}</h1>
      </div>
    )
  }
}

export default SecretComponent