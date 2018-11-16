// node_module
import React, { PureComponent } from 'react'
// local_module
import SearchComponent from '../components/SearchComponent'
import { errorAlert } from '../helpers'

function withSearch(params) {
  const {
    buttonTitle,
    searchTitle,
    resource,
    leftButtonTitle,
    rightButtonTitle,
    showLeftButton,
    showRightButton,
    wrapperComponent,
    placeholder,
    showRadioBox,
    radioOneTitle,
    radioTwoTitle
  } = params ? params : {}

  return class extends PureComponent {

    goToForm = () => {
      this.props.history.push('/' + resource + '/new')
    }

    goToTable = (by,searchValue) => {
      if (!searchValue) {
        this.props.history.push('/' + resource + '/table')
      } else {
        this.props.history.push('/' + resource + '/table/' + by + '/' + searchValue)
      }
    }

    goToReport = (radio,searchContent,startDate,endDate) => {
      if ((radio || radio === 0) && searchContent && startDate && endDate && searchContent.length > 0) {
        if (new Date(startDate) > new Date(endDate)) {
          errorAlert(this.props.alert,'結束日期必須大於開始日期')
        } else {
          this.props.history.push('/reports/' + radio + '/' + startDate + '/' + endDate + '/' + searchContent)
        }
      } else {
        errorAlert(this.props.alert,'輸入資料不能為空')
      }
    }

    render() {
      const Component = wrapperComponent ? wrapperComponent : SearchComponent
      return(
        <Component
          {...this.props}
          title={searchTitle}
          buttonTitle={buttonTitle}
          placeholder={placeholder}
          showLeftButton={showLeftButton || defaultShowLeftButton}
          showRightButton={showRightButton || defaultShowRightButton}
          leftButtonTitle={leftButtonTitle || defaultLeftButtonTitle}
          rightButtonTitle={rightButtonTitle || defaultRightButtonTitle}
          showRadioBox={showRadioBox}
          radioOneTitle={radioOneTitle}
          radioTwoTitle={radioTwoTitle}
          onClickLeftButton={this.goToTable}
          onClickRightButton={this.goToForm}
          onClickReportSearchButton={this.goToReport}
        />
      )
    }
  }
}

const defaultShowLeftButton = true
const defaultShowRightButton = true
const defaultLeftButtonTitle = '搜索'
const defaultRightButtonTitle = '新增'

export default withSearch