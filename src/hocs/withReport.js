// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
// local_module
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'
import ui from '../configs/ui'

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
      this.HoldemStore = this.props.HoldemStore
      this.db = this.props.db
      this.state = {
        header: null,
        isLoading: true,
        data: []
      }
    }

    componentDidMount() {
      const searchValue = this.props.match.params.searchValue
      const date = this.props.match.params.date
      const startDate = this.props.match.params.startDate
      const endDate = this.props.match.params.endDate
      if (router) {

      } else {
        let header = ''
        if (by === 'id') {
          header = '會員代號：' + searchValue + '   ' + '上桌日期：' + startDate + ' ~ ' +  endDate
        } else if (by === 'sale_id') {
          header = '業務代號：' + searchValue + '   ' + '上桌日期：' + startDate + ' ~ ' +  endDate
        }
        this.fetchTableData(this.db.collection(resource)
          .where("club_id", "==", this.HoldemStore.clubId)
          .where(by, "==", searchValue)
          .orderBy("onTableDateInt").startAt(20170620).endAt(20190220)
        ,header)
      }
    }

    fetchTableData = (fetch,header) => {
      this.setState({
        isLoading: true
      },async () => {
        try {
          const snap = await fetch.get()
          const data = snap.docs.map(doc => doc.data())
          this.setState({
            isLoading: false,
            data,
            header
          })
        } catch (err) {
          errorAlert(this.props.alert,'載入資料發生錯誤 : ' + err.toString())
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