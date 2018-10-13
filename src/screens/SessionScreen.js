// node module
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const SessionScreen = () =>         
  <div 
    style={styles.container} 
  >
    <div style={styles.spinner}>
      <CircularProgress size={50}/>
      <h3>{'檢查登入狀態'}</h3>
    </div>
  </div>

const height = window.innerHeight

const styles = {
  container: {
    display: 'flex',
    height
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default SessionScreen