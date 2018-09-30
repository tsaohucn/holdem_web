import React, { PureComponent } from 'react'
// local components
import Change from '../views/Change'

class ChangeComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.value = null
  }

  onChange = (event) => {
    this.value = event.target.value
  }

  onClickConfirmButton = () => {
    this.props.onClickConfirmButton && this.props.onClickConfirmButton(this.value)
  }

  render() {
    return(
      <Change
        {...this.props}
        onClickConfirmButton={this.onClickConfirmButton}
        onChange={this.onChange}
      />
    )
  }
}

export default ChangeComponent