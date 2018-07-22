// node_module
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import FieldComponent from '../components/FieldComponent'
import firebase from '../configs/firebase'

function withField(params) {
  const {
    field,
    buttonTitle,
    resource,
    optionResource
  } = params ? params : {}

  return class extends React.PureComponent {

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
        event: '下載資料中'
      }
      this.setPath()
    }

    componentDidMount() {
      this.fetchOptions()
    }

    setPath = () => {
      const paths = this.props.location.pathname.split("/")
      this.path = paths[paths.length - 2]
    }

    fetchOptions = async () => {
      let all_options = {}
      try {
        const optionPromise = optionResource.map(resource => firebase.database().ref(resource).orderByChild('name').once('value'))
        const snap_arr = await Promise.all(optionPromise)
        snap_arr.forEach((snap,index) => {
          const keys = Object.keys(snap.val() || {})
          const options = keys.map(key => ({
            key,
            name: snap.val()[key]['name']
          }))
          all_options[optionResource[index]] = options
        })
      } catch(err) {
        //
      } finally {
        this.setState({
          isLoading: false,
          ...all_options
        })
      }
    }

    onClickNewPageButton = (state) => {
      this.setState({
        isLoading: true,
        event: '新增資料中'
      },async () => {
        try {
          await firebase.database().ref(resource).push(state)
          if (this.path === 'members') {
            await firebase.database().ref('referees/' +  state.referees + '/memberCount').transaction(memberCount => {
              if (!memberCount) {
                return 1
              } else {
                return memberCount + 1
              }
            })
            await firebase.database().ref('sales/' +  state.sales + '/memberCount').transaction(memberCount => {
              if (!memberCount) {
                return 1
              } else {
                return memberCount + 1
              }
            })
          }
          this.props.alert.show('新增成功')
        } catch(err) {
          this.props.alert.show('新增失敗 : ' + err.toString())
        } finally {
          this.setState({
            isLoading: false
          },() => {
            this.props.history.push('/mains/' + resource + '/index')
          })
        }
      })
    }

    onClickNewPageReturn = () => {
      this.props.history.push('/mains/' + resource + '/index')
    }

    render() {
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
            <FieldComponent
              {...this.props}
              {...this.state}
              field={field}
              buttonTitle={buttonTitle}
              onClickNewPageButton={this.onClickNewPageButton}
              onClickNewPageReturn={this.onClickNewPageReturn}
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

export default withField