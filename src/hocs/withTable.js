// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withTable(params) {
  const {
    title,
    resource,
    wrapperComponent
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
        data: []
      }
    }

    componentDidMount() {
      const searchValue = this.props.match.params.searchValue
      const by = this.props.match.params.by
      if (resource === 'clubs') {
        if (!searchValue) {
          this.fetchTableData(firebase.database().ref(resource))
        } else {
          this.fetchTableData(firebase.database().ref(resource).orderByChild('id').equalTo(searchValue))
        }
      } else {
        if (by === 'club_id') {
          searchValue && this.fetchTableData(firebase.database().ref(resource).orderByChild('club_id').equalTo(searchValue))
        } else {
          if (!searchValue) {
            this.fetchTableData(firebase.database().ref(resource).orderByChild('club_id').equalTo(this.props.HoldemStore.clubId))
          } else {
            by && this.fetchTableData(firebase.database().ref(resource).orderByChild('club_id_' + by).equalTo(this.props.HoldemStore.clubId + '_' + searchValue))
          }
        }
      }
    }

    fetchTableData = (fetch) => {
      this.setState({
        isLoading: true
      },async () => {
        try {
          await sleep(500)
          const snap = fetch && (await fetch.once('value'))
          const val = (snap && snap.val()) || {}
          const data = Object.values(val) || []
          this.setState({
            isLoading: false,
            data
          }) 
        } catch(err) {
          errorAlert(this.props.alert,'載入資料發生錯誤 : ' + err.toString())
        } finally {
          //
        }         
      })     
    }

    goToCountTable = (key,id) => {
      switch(key) {
      case 'employeeCount':
        if (resource === 'clubs') {
          this.props.history.push('/employees/simpleTable/club_id/' + id)
        }
        break
      case 'refereeCount':
        if (resource === 'clubs') {
          this.props.history.push('/referees/simpleTable/club_id/' + id)
        }
        break
      case 'saleCount':
        if (resource === 'clubs') {
          this.props.history.push('/sales/simpleTable/club_id/' + id)
        }
        break
      case 'memberCount':
        if (resource === 'clubs') {
          this.props.history.push('/members/simpleTable/club_id/' + id)
        } else if (resource === 'referees') {
          this.props.history.push('/members/simpleTable/referee_id/' + id)
        } else if (resource === 'sales') {
          this.props.history.push('/members/simpleTable/sale_id/' + id)
        }
        break
      }
    }

    goToEditPage = (key) => {
      this.props.history.push('/' + resource + '/edit/' + key)
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
              onClickCount={this.goToCountTable}
              onClickEdit={this.goToEditPage}
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

export default withTable