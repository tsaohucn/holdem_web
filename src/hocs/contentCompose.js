// node module
import React from 'react';
// local components
function contentCompose(PageOneComponent,PageTwoComponent,PageThreeComponent) {
  return class extends React.Component {
  	constructor(props) {
  	  super(props)
      this.state = {
        page: 1
      }
  	}

    goToPageTwo = () => {
      this.setState({
        page: 2
      })
    }

    renderSubComponent() {
      if (this.state.page === 3) {
        return PageThreeComponent
      } else if (this.state.page === 2) {
        return PageTwoComponent
      } else {
        return PageOneComponent
      }
    }

    render() {

      const SubComponent = this.renderSubComponent()

      return(
        <div {...this.props}>
          <SubComponent
            onClick={this.goToPageTwo}
          />
        </div>
      )
    }
  }
}

export default contentCompose