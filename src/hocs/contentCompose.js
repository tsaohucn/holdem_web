// node module
import React from 'react'
import Spinner from 'react-spinner-material'
// local components
function contentCompose(PageOneComponent,PageTwoComponent,PageThreeComponent) {
  return class extends React.Component {
  	constructor(props) {
  	  super(props)
      this.state = {
        isLoading: false,
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
        <div style={styles.container} {...this.props}>
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <Spinner
                size={120}
                spinnerColor={"#4682b4"}
                spinnerWidth={5}
              /> 
            </div>
            :
            <SubComponent
              onClickPageOneLeftButton={this.onClickPageOneLeftButton}
              onClickPageOneRightButton={this.onClickPageOneRightButton}
              onClickPageTwoButton={this.onClickPageTwoButton}
              onClickPageThreeButton={this.onClickPageThreeButton}
            />
          }
        </div>
      )
    }
  }
}

const styles = {
  container: {
    height: '100%'
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    height: '100%'    
  }
}

export default contentCompose