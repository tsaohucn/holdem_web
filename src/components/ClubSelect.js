// node_module
import React, { PureComponent } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
// local components
import firebase from '../configs/firebase'

class ClubSelect extends PureComponent {

  state = {
    loading: true,
    options: []
  }

  componentDidMount() {
    firebase.database().ref('clubs').orderByChild('name').once('value')
    .then(snap => {
      if (snap.val()) {
        const club_keys = Object.keys(snap.val())
        const options = club_keys.map(key => ({
          key,
          name: snap.val()[key]['name']
        }))
        this.setState({
          loading: false,
          options
        })
      }
    })
    .catch(err => {
      //
    })
  }

  renderOptions() {
    if (this.state.loading) {
      return(
        <div style={styles.spinner}>
          <CircularProgress size={10}/>
        </div>
      )
    } else {
      return this.state.options.map(option => (
        <MenuItem key={option.key} value={option.key}>
          {option.name}
        </MenuItem>
      ))
    }  
  }

  render() {
    return(
      this.renderOptions()
    )
  }
}

const styles = {
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const renderClubSelect = () => <renderClubSelect/>

export { renderClubSelect }