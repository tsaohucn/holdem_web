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
        const header = by === 'id' ? '會員代號：' : '業務代號：' + searchValue + '   ' + '上桌日期：' + startDate + ' ~ ' +  endDate
        const fetch = this.db.collection(resource)
          .where('club_id', '==', this.HoldemStore.clubId)
          .where(by, '==', searchValue)
          .orderBy('onTableDateInt')
          .startAt(parseInt(Moment(startDate).format('YYYYMMDD')))
          .endAt(parseInt(Moment(endDate).format('YYYYMMDD')))
        this.fetchTableData(fetch,header)
      } else if ((by === 'refereeTotal') || (by === 'refereeDay')){
        let header = null
        if (by === 'refereeTotal') {
          header = '裁判代號：' + searchValue + '   ' + '上桌日期：' + startDate + ' ~ ' +  endDate
          const date_range = getDateRange(startDate,endDate)
          const fetch = date_range.map(_date => this.db.collection(resource)
            .where('club_id', '==', this.HoldemStore.clubId)
            .where('referee_id', '==', searchValue)
            .where('onTableDate', '==', Moment(_date).format('YYYY/MM/DD')).get())
          this.fetchTableData(fetch,header,null,null,null,searchValue,date_range)
        } else {
          header = '裁判代號：' + searchValue + '   ' + '上桌日期：' + date
          const fetch = this.db.collection(resource)
            .where('club_id', '==', this.HoldemStore.clubId)
            .where('referee_id', '==', searchValue)
            .where('onTableDate', '==', Moment(date).format('YYYY/MM/DD'))
          this.fetchTableData(fetch,header,null,null,null,searchValue)
        }
      } else if (by === 'table_id') {
        const header = '桌次編號：' + searchValue
        const fetch = this.db.collection(resource)
          .where('club_id', '==', this.HoldemStore.clubId)
          .where('table_id', '==', searchValue)
        this.fetchTableData(fetch,header)        
      }
    }

    fetchTableData = (fetch,header,startDate,endDate,date,searchValue,dateRange) => {
      this.setState({
        isLoading: true
      },async () => {
        try {
          let data = []
          if (by === 'refereeTotal') {
            const promise_snap = await Promise.all(fetch)
            const source_data = promise_snap.map(snap => snap.docs.map(doc => doc.data()))
            data = await getRefereeReportData(source_data,searchValue,this.db,dateRange)
          } else {
            const snap = await fetch.get()
            const source_data = snap.docs.map(doc => doc.data())
            switch(by) {
            case 'sale_id': {
              data = getSaleReportData(source_data)
              break
            }
            case 'refereeDay': {
              data = await getRefereeDayReportData(source_data,searchValue,this.db)
              break
            }
            case 'table_id' :
            case 'id': {
              data = await getMemberReportData(source_data,this.db)
              break
            }
            }
          }
          this.setState({
            isLoading: false,
            data,
            header,
            saleReport: by === 'sale_id'
          })
        } catch (err) {
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