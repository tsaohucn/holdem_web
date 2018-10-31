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
    wrapperComponent
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.playerListener = null
      this.state = {
        modalIsShow: false,
        isLoading: false,
        data: []
      }
    }

    componentDidMount() {
      const searchValue = this.props.match.params.searchValue
      if (!searchValue) {
        this.playerListener = firebase.firestore().collection('members')
        .where("club_id", "==", this.props.HoldemStore.clubId)
        .where("onTable", "==", true)
      } else {
        this.playerListener = firebase.firestore().collection('members')
        .where("club_id", "==", this.props.HoldemStore.clubId)
        .where("table_id", "==", searchValue)
      }
      this.fetchTableData(this.playerListener)
    }

    componentWillUnmount() {
      this.removePlayerListener()
    }

    fetchTableData = (fetch) => {
      fetch.onSnapshot((querySnapshot) => {
        this.setState({
          isLoading: true
        },async () => {
          await sleep(500)
          const data = querySnapshot.docs.map(doc => doc.data())
          this.setState({
            isLoading: false,
            data
          })
        })
      })   
    }

    removePlayerListener = () => {
      if (this.playerListener) {
        this.playerListener.off()
        this.playerListener = null
      }
    }

    goBack = () => {
      this.props.history.goBack()
    }

    showModal = () => {
      this.setState({
        modalIsShow: true
      })
    }

    closeModal = () => {
      this.setState({
        modalIsShow: false
      })      
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
              onClickChipGrap={this.showModal}
              onClickModal={this.closeModal}
              onClickTableReturnButton={this.goBack}
              modalIsShow={this.state.modalIsShow}
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