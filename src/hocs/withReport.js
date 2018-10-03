// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
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
    belong
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.id = this.props.match.params.id || ''
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
          const snap = await firebase.database().ref('members_report/').once('value')
          if (snap.val()) {
            const data = Object.values(snap.val())
            this.setState({
              isLoading: false,
              data
            })     
          }
        } catch (error) {
          errorAlert(this.props.alert,'載入失敗 : ' + error.toString())
        } finally {
          //
        }
      })
      /*
      if (this.id === '$all') {
        this.fetchTableData(firebase.database().ref(resource))
      } else {
        this.fetchTableData(firebase.database().ref(resource).orderByChild('id').equalTo(this.id))
      }*/
    }
/*
    fetchTableData = async (fetch) => {
      let data_arr = []
      let id_names = {}
      try {
        await sleep(500)
        const snap = fetch && (await fetch.once('value'))
        const data = (snap && snap.val()) || {}
        data_arr = Object.values(data) || []
        const resource_keys = belong.map(belongResource => {
          return data_arr.map(ele => {
            return ele[belongResource]
          })
        }).flat()
        const uniq_resource_keys = resource_keys.filter(ele => ele).filter((elem, pos, arr) => {
          return arr.indexOf(elem) == pos
        }) // uniq
        const id_names_promise = uniq_resource_keys.map(key => firebase.database().ref('id_names/' + key).once('value'))
        const id_names_snap = await Promise.all(id_names_promise)
        uniq_resource_keys.forEach((key,index) => {
          id_names[key] = id_names_snap[index].val()
        })
        this.setState({
          isLoading: false,
          data: data_arr,
          id_names
        }) 
      } catch(err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        //
      }      
    }
*/
    goBack = () => {
      this.props.history.goBack()
    }

    goToDateReport = (date) => {
      this.props.history.push('/reports/referee/day/' + date)
    }

    goToMemberReport = (date) => {
      this.props.history.push('/reports/member/' + date + '/' + date + '/' + 'test')
    }

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
              onClickDate={this.goToDateReport}
              onClickTableId={this.goToMemberReport}
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