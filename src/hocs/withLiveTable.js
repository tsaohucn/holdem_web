// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import PartialTable from '../views/PartialTable'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withLiveTable(params) {
  const {
    title,
    resource,
    wrapperComponent,
    belong
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.id = this.props.match.params.id
      this.state = {
        isLoading: true,
        event: '載入中',
        data: []
      }
    }

    componentDidMount() {
      if (this.id === '$all') {
        this.fetchTableData(firebase.database().ref('members'))
      } else {
        this.fetchTableData(firebase.database().ref('members').orderByChild('id').equalTo(this.id))
      }
    }

    fetchTableData = async (fetch) => {
      try {
        await sleep(500)
        const snap = fetch && (await fetch.once('value'))
        const data = (snap && snap.val()) || {}
        const member_arr = Object.values(data) || []
        const member_with_table_arr = member_arr.filter(ele => ele.table)
        const table_keys = member_with_table_arr.map(ele => ele.table)
        const uniq_table_keys = table_keys.filter((elem, pos, arr) => {
          return arr.indexOf(elem) == pos
        }) // uniq
        const table_promise = uniq_table_keys.map(key => firebase.database().ref('tables/' + key).once('value'))
        const table_snap = await Promise.all(table_promise)
        let table_data = {}
        uniq_table_keys.forEach((key,index) => {
          table_data[key] = table_snap[index].val()
        })
        const table_referee_keys = Object.values(table_data).map(ele => ele.referee)
        const member_referee_keys = Object.values(member_with_table_arr).map(ele => ele.referee)
        const uniq_referee_keys = table_referee_keys.concat(member_referee_keys).filter(ele => ele).filter((elem, pos, arr) => {
          return arr.indexOf(elem) == pos
        }) // uniq
        const referee_id_names_promise = uniq_referee_keys.map(key => firebase.database().ref('id_names/' + key).once('value'))
        const id_names_snap = await Promise.all(referee_id_names_promise)
        const id_names = {}
        uniq_referee_keys.forEach((key,index) => {
          id_names[key] = id_names_snap[index].val()
        })
        const combine_data = member_with_table_arr.map(ele => {
          return({
            table_date: table_data[ele.table]['date'],
            table_id: table_data[ele.table]['id'],
            table_referee: table_data[ele.table]['referee'],
            referee: ele.referee,
            id: ele.id,
            name: ele.name,
            date: ele.date,
            time: ele.time,
            level: 'dsdsdsd',
            spend_time: 'spend_time',
            '6mins': '6mins'
          })
        })
        this.setState({
          isLoading: false,
          data: combine_data,
          id_names
        })
      } catch (err) {
        errorAlert(this.props.alert,'載入失敗 : ' + err.toString())
      } finally {
        //
      }      
    }

    goBack = () => {
      this.props.history.goBack()
    }

    goToEdit = () => {
      this.props.history.push('/' + resource + '/edit/' + this.id)
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
              <h3>{this.state.event}</h3>
            </div>
            :
            <Component
              {...this.props}
              {...this.state}
              title={title}
              onClickTableReturnButton={this.goBack}
              onClickEdit={this.goToEdit}
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

export default withLiveTable