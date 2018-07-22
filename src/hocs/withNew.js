// node_module
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import NewPage from '../components/NewPage'
import firebase from '../configs/firebase'

function withNew(params) {
  const {
    field,
    buttonTitle,
    resource
  } = params ? params : {}

  return class extends React.PureComponent {

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true
      }
    }

  onClickNewPageButton = () => {
    // do something
    this.props.history.push('/mains/' + resource + '/index')
  }

  onClickNewPageReturn = () => {
    this.props.history.push('/mains/' + resource + '/index')
  }

  render() {
    return(
      <NewPage
       {...this.props}
       field={field}
       buttonTitle={buttonTitle}
       onClickNewPageButton={this.onClickNewPageButton}
       onClickNewPageReturn={this.onClickNewPageReturn}
      />
    )
  }
  }
}


export default withNew