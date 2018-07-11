// node module
import React from 'react';
// local components
import HoldemBar from '../components/HoldemBar'

function withHoldemBar(WrappedComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props)
		}

    render() {
    	return(
        <HoldemBar>
          <WrappedComponent {...this.props}/>
        </HoldemBar>
    	)
    }

	}
}

export default withHoldemBar