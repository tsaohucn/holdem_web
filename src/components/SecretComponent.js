import React, { PureComponent } from 'react'

class SecretComponent extends PureComponent {

  render() {
    return(
      <div>
        <h1>{this.props.test}</h1>
      </div>
    )
  }
}

export default SecretComponent