import React, { PureComponent } from 'react'
// local components
import ChangePassword from '../views/ChangePassword'

class PasswordComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <ChangePassword
        {...this.props}
      />
    )
  }
}

export default PasswordComponent