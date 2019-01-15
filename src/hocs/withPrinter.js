// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import PartialTable from '../views/PartialTable'
//import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'
import ui from '../configs/ui'

function withPrinter(params) {
  const {
    title,
    wrapperComponent
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.db = this.props.db
      this.playerListener = null
      this.state = {
        data: []
      }
    }

    componentDidMount() {
      this.playerListener = this.db.collection('printers').where('club_id', '==', this.props.HoldemStore.clubId).onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        this.setState({ data })
      })
    }

    componentWillUnmount() {
      this.playerListener && this.playerListener()
    }

    goBack = () => {
      this.props.history.goBack()
    }

    render() {

      const Component = wrapperComponent ? wrapperComponent : PartialTable

      return(
        <div 
          style={styles.container} 
        >
          <Component
            {...this.props}
            {...this.state}
            title={title}
            onClickTableReturnButton={this.goBack}
          />
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

export default withPrinter