// node module
import React from 'react'
// local components
import NavigationBar from '../components/NavigationBar'

function withNavigation(WrappedComponent) {
  return class extends React.PureComponent {
	constructor(props) {
	  super(props)
	}

    render() {
      return(
        <NavigationBar {...this.props}>
          <WrappedComponent {...this.props}/>
        </NavigationBar>
      )
    }
  }
}

export default withNavigation