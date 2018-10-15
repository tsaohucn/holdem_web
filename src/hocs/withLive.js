// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withLive(params) {
  const {
    title,
    resource,
    wrapperComponent,
    by
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.state = {
        isLoading: false,
        data: []
      }
    }

    componentDidMount() {
      const searchValue = this.props.match.params.searchValue
      const by = this.props.match.params.by
      if (!searchValue) {
        //this.fetchTableData(firebase.database().ref('members').orderByChild('onTable').equalTo(true))
      } else {
        this.fetchTableData(firebase.database().ref('members').orderByChild('club_id_table_id').equalTo(this.props.HoldemStore.clubId + '_' + searchValue))
      }
    }

    fetchTableData = (fetch) => {
      fetch.on('value',(snap) => {
        this.setState({
          isLoading: true
        },async () => {
          await sleep(500)
          let data = []
          const val = snap.val()
          if (val) {
            data = Object.values(val) || []
          }
          this.setState({
            isLoading: false,
            data
          })
        })
      })   
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
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <CircularProgress size={50}/>
            </div>
            :
            <Component
              {...this.props}
              {...this.state}
              title={title}
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

export default withLive