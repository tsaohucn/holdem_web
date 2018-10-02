// node_module
import React, { PureComponent } from 'react'
// local_module
import ReportPageComponent from '../components/ReportPageComponent'
import { errorAlert, successAlert, sleep } from '../helpers'

function withReport(params) {
  const {
    onClickButton
  } = params ? params : {}

  return class extends PureComponent {

    search = (radio,searchContent,startDate,endDate) => {
      if (radio !== null && searchContent !== null && startDate !== null && endDate !== null) {

      } else {
        errorAlert(this.props.alert,'輸入資料不能為空')
      }
    }

    render() {

      return(
        <ReportPageComponent
          {...this.props}
          buttonTitle={'搜尋'}
          onClickButton={this.search}
        />
      )
    }
  }
}

export default withReport