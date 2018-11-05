// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Moment from 'moment'
// local_module
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
import { 
  errorAlert, 
  successAlert, 
  sleep, 
  getSaleReportData,
  getRefereeReportData,
  getRefereeDayReportData,
  getMemberReportData,
  getDateRange
} from '../helpers'
import ui from '../configs/ui'

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
      this.HoldemStore = this.props.HoldemStore
      this.db = this.props.db
      this.state = {
        header: null,
        isLoading: true,
        data: [],
        saleReport: null
      }
    }

    componentDidMount() {
      const searchValue = this.props.match.params.searchValue
      const date = this.props.match.params.date
      const startDate = this.props.match.params.startDate
      const endDate = this.props.match.params.endDate
      if ((by === 'id') || (by === 'sale_id')) {
        let header = null
        if (by === 'id') {
          header = '會員代號：' + searchValue + '   ' + '上桌日期：' + startDate + ' ~ ' +  endDate
        } else if (by === 'sale_id') {
          header = '業務代號：' + searchValue + '   ' + '上桌日期：' + startDate + ' ~ ' +  endDate
        }
        this.fetchTableData(this.db.collection(resource)
          .where("club_id", "==", this.HoldemStore.clubId)
          .where(by, "==", searchValue)
          .orderBy("onTableDateInt")
          .startAt(parseInt(Moment(startDate).format('YYYYMMDD')))
          .endAt(parseInt(Moment(endDate).format('YYYYMMDD')))
        ,header)
      } else if ((by === 'refereeTotal') || (by === 'refereeDay')){
        let header = null
        if (by === 'refereeTotal') {
          header = '裁判代號：' + searchValue + '   ' + '上桌日期：' + startDate + ' ~ ' +  endDate
          const date_range = getDateRange(startDate,endDate)
          const referee_total_data_promise = date_range.map(_date => this.db.collection(resource)
            .where("club_id", "==", this.HoldemStore.clubId)
            .where("referee_id", "==", searchValue)
            .where("onTableDate", "==", Moment(_date).format('YYYY/MM/DD')).get())
          this.fetchTableData(referee_total_data_promise,header,null,null,null,searchValue,date_range)
        } else {
          header = '裁判代號：' + searchValue + '   ' + '上桌日期：' + date
          this.fetchTableData(this.db.collection(resource)
            .where("club_id", "==", this.HoldemStore.clubId)
            .where("referee_id", "==", searchValue)
            .where("onTableDate", "==", Moment(date).format('YYYY/MM/DD'))
          ,header,null,null,null,searchValue)
        }
      } else {
        const header = '桌次編號：' + searchValue
        this.fetchTableData(this.db.collection(resource)
          .where("club_id", "==", this.HoldemStore.clubId)
          .where("table_id", "==", searchValue)
        ,header)        
      }
    }

    fetchTableData = (fetch,header,startDate,endDate,date,searchValue,dateRange) => {
      this.setState({
        isLoading: true
      },async () => {
        try {
          let data = []
          if (by === 'refereeTotal') {
            const promise_val = await Promise.all(fetch)
            const referee_total_data = promise_val.map(snap => snap.docs.map(doc => doc.data()))
            data = await getRefereeReportData(referee_total_data,searchValue,this.db,dateRange)
          } else {
            const snap = await fetch.get()
            data = snap.docs.map(doc => doc.data())
            if (by === 'sale_id') {
              data = getSaleReportData(data)
            } else if (by === 'refereeDay') {
              data = await getRefereeDayReportData(data,searchValue,this.db)
            } else {
              data = await getMemberReportData(data,this.db)
            }
          }
          this.setState({
            isLoading: false,
            data,
            header,
            saleReport: by === 'sale_id'
          })
        } catch (err) {
          console.log(err)
          errorAlert(this.props.alert,'載入資料發生錯誤 : ' + err.toString())
        }
      })
    }

    goToRefereeDayReport = (date) => {
      const _date = Moment(date).format('YYYY-MM-DD')
      const searchValue = this.props.match.params.searchValue
      this.props.history.push('/reports/refereeDay/' + _date + '/' + searchValue)
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
              saleReport={this.state.saleReport}
              header={this.state.header}
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