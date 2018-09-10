// node_module
import React from 'react'
// local_module
import SecretComponent from '../components/SecretComponent'

function withSecret(params) {
  const {
    test
  } = params ? params : {}

  return class extends React.PureComponent {

    render() {
      
      return(
        <SecretComponent
          {...this.props}
          test={test}
        />
      )
    }
  }
}


export default withSecret