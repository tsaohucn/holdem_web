// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
// local_module
import PartialTableTwo from '../views/PartialTableTwo'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withReport(params) {
  const {
    title,
    resource,
    wrapperComponent,
    auth,
    belong,
    router
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.id = this.props.match.params.id || ''
      this.startDate = this.props.match.params.startDate || ''
      this.endDate = this.props.match.params.endDate || ''
      this.date = this.props.match.params.date || ''
      this.state = {
        isLoading: true,
        event: '載入中',
        data: []
      }
    }

    componentDidMount() {
      this.setState({
        isLoading: true,      
      },async () => {
        try {
          await sleep(500)
          this.setState({
            isLoading: false     
          })
        } catch (error) {
          errorAlert(this.props.alert,'載入失敗 : ' + error.toString())
        } finally {
          //
        }
      })
    }

    goBack = () => {
      this.props.history.goBack()
    }
/*
    goToDateReport = (date) => {
      this.props.history.push('/reports/referee/day/' + date)
    }

    goToMemberReport = (date,id) => {
      this.props.history.push('/reports/member/' + date + '/' + date + '/' + id)
    }
*/
    render() {

      const Component = wrapperComponent ? wrapperComponent : PartialTableTwo

      return(
        <div 
          style={styles.container} 
        >
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <CircularProgress size={50}/>
              <h3>{this.state.event}</h3>
            </div>
            :
            <Component
              {...this.props}
              {...this.state}
              title={title}
              onClickTableReturnButton={this.goBack}
              //onClickDate={this.goToDateReport}
              //onClickTableId={this.goToMemberReport}
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