import React, { PureComponent } from 'react'
// local components
import ReportPage from '../views/ReportPage'

class ReportPageComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.startDate = null
    this.endDate = null
    this.searchContent = {
      member: '',
      referee: '',
      sale: ''      
    }
    this.state = {
      radio: {
        member: false,
        referee: false,
        sale: false
      }
    }
  }

  onClickReportSearchButton = () => {
    const radio = Object.keys(this.state.radio).find(key => this.state.radio[key])
    this.props.onClickReportSearchButton && this.props.onClickReportSearchButton(radio,this.searchContent[radio],this.startDate,this.endDate)
  }

  onChangeMemberText = (event) => {
    this.searchContent['member'] = event.target.value
  }

  onChangeRefereeText = (event) => {
    this.searchContent['referee'] = event.target.value
  }

  onChangeSaleText = (event) => {
    this.searchContent['sale'] = event.target.value
  }

  onChangeStartDate = (event) => {
    this.startDate =  event.target.value
  }

  onChangeEndDate = (event) => {
    this.endDate =  event.target.value
  }

  onClickRadio = (event,checked) => {
    switch(event.target.value) {
    case 'member':
      this.setState({
        radio: {
          member: true,
          referee: false,
          sale: false
        }
      })
      break
    case 'referee':
      this.setState({
        radio: {
          member: false,
          referee: true,
          sale: false
        }
      })
      break
    case 'sale':
      this.setState({
        radio: {
          member: false,
          referee: false,
          sale: true
        }
      })
      break
    default:
      break
    }
  }

  render() {
    return(
      <ReportPage
        {...this.props}
        radio={this.state.radio}
        onClickRadio={this.onClickRadio}
        onChangeMemberText={this.onChangeMemberText}
        onChangeRefereeText={this.onChangeRefereeText}
        onChangeSaleText={this.onChangeSaleText}
        onChangeStartDate={this.onChangeStartDate}
        onChangeEndDate={this.onChangeEndDate}
        onClickReportSearchButton={this.onClickReportSearchButton}
      />
    )
  }
}

export default ReportPageComponent