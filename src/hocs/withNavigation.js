// node module
import React, { PureComponent } from 'react'
// local components
import NavigationComponent from '../components/NavigationComponent'

function withNavigation(WrappedComponent) {
  return class extends PureComponent {

  	constructor(props) {
  	  super(props)
  	}
    
    render() {
      return(
        <NavigationComponent {...this.props}>
          <WrappedComponent {...this.props}/>
        </NavigationComponent>
      )
    }
  }
}

export default withNavigation