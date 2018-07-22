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
    }

    componentDidMount() {
      this.fetchOptions()
    }

    fetchOptions = async () => {
      let options = []
      try {
        const snap = await firebase.database().ref(optionResource).orderByChild('name').once('value')
        const keys = Object.keys(snap.val() || {})
        options = keys.map(key => ({
          key,
          name: snap.val()[key]['name']
        }))
      } catch(err) {
        //
      } finally {
        this.setState({
          isLoading: false,
          [optionResource]: options
        })
      }
    }

    onClickNewPageButton = (state) => {
      this.setState({
        isLoading: true,
        event: '上傳資料中'
      },async () => {
        try {
          await firebase.database().ref(resource).push(state)
          this.props.alert.show('上傳成功')
        } catch(err) {
          this.props.alert.show('上傳失敗 : ' + err.toString())
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