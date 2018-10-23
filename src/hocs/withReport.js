// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
// local_module
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withReport(params) {
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
        isLoading: true,
        data: []
      }
    }

    componentDidMount() {
      const searchValue = this.props.match.params.searchValue
      if (searchValue) {
        this.fetchTableData(firebase.database().ref('reports').orderByChild('club_id_member_id').equalTo(this.props.HoldemStore.clubId + '_' + searchValue))
      } else {
        errorAlert(this.props.alert,'載入資料發生錯誤')
      }
    }

    fetchTableData = (fetch) => {
      this.setState({
        isLoading: true
      },async () => {
        try {
          await sleep(500)
          const startDate = this.props.match.params.startDate
          const endDate = this.props.match.params.endDate
          const moment = extendMoment(Moment)
          const start = moment(startDate, 'YYYY-MM-DD')
          const end   = moment(endDate, 'YYYY-MM-DD')
          const range = Array.from(moment.range(start, end).by('day', { excludeEnd: false })).map(m => m.format('YYYY/MM/DD'))
          const snap = fetch && (await fetch.once('value'))
          const val = (snap && snap.val()) || {}
          const data = Object.values(val) || []
          const in_range_data = data.filter(ele => range.includes(ele.playerDate))
          this.setState({
            isLoading: false,
            data: in_range_data
          }) 
        } catch(err) {
          errorAlert(this.props.alert,'載入資料發生錯誤 : ' + err.toString())
        } finally {
          //
        }         
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

export default withReport