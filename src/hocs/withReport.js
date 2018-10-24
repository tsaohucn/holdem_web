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
    by,
    router
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
      if (searchValue && by) {
        this.fetchTableData(firebase.database().ref('reports').orderByChild(by).equalTo(this.props.HoldemStore.clubId + '_' + searchValue))
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
          const startDate = this.props.match.params.startDate || this.props.match.params.date
          const endDate = this.props.match.params.endDate || this.props.match.params.date
          const moment = extendMoment(Moment)
          const start = moment(startDate, 'YYYY-MM-DD')
          const end   = moment(endDate, 'YYYY-MM-DD')
          const range = Array.from(moment.range(start, end).by('day', { excludeEnd: false })).map(m => m.format('YYYY/MM/DD'))
          const snap = fetch && (await fetch.once('value'))
          const val = (snap && snap.val()) || {}
          const data = Object.values(val) || []
          let in_range_data = data.filter(ele => range.includes(ele.playerDate))
          let totalSpendTime = {}
          if (router === 'reports/referee') {
            in_range_data = range.map(date => ({
              referee_report_date: date,
              referee_rk: 0,
              referee_rk50: 0,
              referee_st: 0
            }))
          } else if (router === 'reports/day/referee') {
            in_range_data = in_range_data.map(ele => ({
              ...ele,
              referee_day_report_table_id: ele.table_id
            }))
          } else if (router === 'reports/sale') {
            in_range_data.forEach(ele => {
              const spendTime = totalSpendTime[ele.playerDate + '_' + ele.member_referee_id] || 0
              totalSpendTime[ele.playerDate + '_' + ele.member_referee_id] = spendTime + ele.spendTime
            })
          }
          this.setState({
            isLoading: false,
            data: in_range_data,
            totalSpendTime
          }) 
        } catch(err) {
          errorAlert(this.props.alert,'載入資料發生錯誤 : ' + err.toString())
        } finally {
          //
        }         
      })     
    }

    goToRefereeDayReport = (date) => {
      const _date = date.split('/').join('-')
      const searchValue = this.props.match.params.searchValue
      this.props.history.push('/reports/day/referee/' + _date + '/' + searchValue)
    }

    goToTableReport = (table_id) => {
      const date = this.props.match.params.date
      this.props.history.push('/reports/table/' + date + '/' + table_id)
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
              onClickRefereeReportDate={this.goToRefereeDayReport}
              onClickRefereeDayReportTableId={this.goToTableReport}
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