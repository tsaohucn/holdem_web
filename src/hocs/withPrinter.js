// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
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
      /*
      const searchValue = this.props.match.params.searchValue
      if (!searchValue) {
        this.fetchTableData(this.db.collection('members')
          .where('club_id', '==', this.props.HoldemStore.clubId)
          .where('onTable', '==', true))
      } else {
        this.fetchTableData(this.db.collection('members')
          .where('club_id', '==', this.props.HoldemStore.clubId)
          .where('table_id', '==', searchValue))
      }*/
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