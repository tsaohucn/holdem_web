// node_module
import React, { PureComponent } from 'react'
// local_module
import ReportPageComponent from '../components/ReportPageComponent'
import { errorAlert, successAlert, sleep } from '../helpers'

function withReport(params) {
  const {
    buttonTitle
  } = params ? params : {}

  return class extends PureComponent {

    search = (radio,searchContent,startDate,endDate) => {
      if ((radio || radio === 0) && searchContent && startDate && endDate && searchContent.length > 0) {
        if (new Date(startDate) >= new Date(endDate)) {
          errorAlert(this.props.alert,'結束日期必須大於開始日期')
        } else {
          this.props.history.push('/reports/' + radio + '/' + startDate + '/' + endDate + '/' + searchContent)
        }
      } else {
        errorAlert(this.props.alert,'輸入資料不能為空')
      }
    }

    render() {

      return(
        <ReportPageComponent
          {...this.props}
          buttonTitle={buttonTitle}
          onClickButton={this.search}
        />
      )
    }
  }
}

export default withReport