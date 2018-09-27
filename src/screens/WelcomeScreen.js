// node module
import React, { Component } from 'react'
import { 
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
  Button
} from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
// local components
import firebase from '../configs/firebase'

class WelcomeScreen extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      account: '',
      password:'',
      loadingState: ''
    }
  }

  getValidationState = () => {
    const length = this.state.account.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
    return null
  }

  setAccount = e => {
    this.setState({ account: e.target.value })
  }

  setPassword = e => {
    this.setState({ password: e.target.value })
  }

  login = () => {
    this.props.HoldemStore.setUser(true,'admin')
    /*
    this.setState({
      loadingState: '登入中'
    },() => {
      firebase.database().ref('/users').orderByChild('account').equalTo(this.state.account).once('value')
      .then((snap) => {
        const val = snap.val()
        if (val) {
          const user = Object.values(val)[0]
          if (user.password.toString() === this.state.password) {
            this.props.HoldemStore.setUser(true,user.resource)
          } else {
            this.loginError()
          }
        } else {
          this.loginError()
        }
      })      
    })*/
  }

  loginError = () => {
    this.setState({
      loadingState: '登入錯誤'
    }) 
  }

  render() {
    return (
      <Grid 
        container
        style={styles.gird}
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
       >
        <h1 style={styles.title}>德州舖克後台管理系統</h1>
        <h4 style={styles.loadingState}>{this.state.loadingState}</h4>
	      <form>
	        <FormGroup
	          controlId="formBasicText"
	          validationState={this.getValidationState()}
	        >
	          <FormControl
	            type="text"
	            value={this.state.account}
	            placeholder="請輸入您的帳號"
	            onChange={this.setAccount}
	          />
	          <FormControl.Feedback />
            <br/>
            <FormControl
              type="text"
              value={this.state.password}
              placeholder="請輸入您的密碼"
              onChange={this.setPassword}
            />
	        </FormGroup>
          <div style={styles.buttonView}>
            <Button onClick={this.login}>登入</Button>
          </div>
	      </form>
      </Grid>
    )
  }
}

export default inject("HoldemStore")(WelcomeScreen)

const height = window.innerHeight

const styles = {
	gird: {
		height
	},
  loadingState: {
    color: '#778899',
    textAlign: 'center'
  },
  title:{
    textAlign: 'center'
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center'
  }
}