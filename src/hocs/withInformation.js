// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import PartialInformation from '../views/PartialInformation'

function withInformation(params) {
  const {
    wrapperComponent
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.HoldemStore = this.props.HoldemStore
      this.search = this.props.match.params.search || ''
      this.state = {
        isLoading: false,
        event: '載入中',
        data: []
      }
    }

    goBack = () => {
      this.props.history.goBack()
    }

    render() {

      const Component = wrapperComponent ? wrapperComponent : PartialInformation

      return(
        <div 
          style={styles.container} 
        >
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <CircularProgress size={50}/>
            </div>
            :
            <Component
              {...this.props}
              id={this.HoldemStore.id}
              resource={this.HoldemStore.resource}
              account={this.HoldemStore.account}
              password={this.HoldemStore.password}
              clubId={this.HoldemStore.clubId}
              onClickTableReturnButton={this.goBack}
            />
          }
        </div>
      )
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default withInformation