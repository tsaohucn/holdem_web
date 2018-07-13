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

    onClickPageOneRightButton = () => {
      this.setState({
        page: 2
      })
    }

    onClickPageOneLeftButton = () => {
      // do something then
      this.setState({
        page: 3
      })      
    }

    onClickPageTwoButton = () => {
      // do something then
      this.setState({
        page: 1
      })      
    }

    onClickPageThreeButton = () => {
      this.setState({
        page: 1
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
            onClickPageOneLeftButton={this.onClickPageOneLeftButton}
            onClickPageOneRightButton={this.onClickPageOneRightButton}
            onClickPageTwoButton={this.onClickPageTwoButton}
            onClickPageThreeButton={this.onClickPageThreeButton}
          />
        </div>
      )
    }
  }
}

export default contentCompose