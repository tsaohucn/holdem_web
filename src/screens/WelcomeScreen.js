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
import validator from "email-validator"
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
    const flag = validator.validate(this.state.account)
    if (this.state.account.length > 0) {
      if (flag) {
        return 'success'
      } else {
        return 'error'
      }
    } else {
      return null
    }
  }

  setAccount = e => {
    this.setState({ account: e.target.value })
  }

  setPassword = e => {
    this.setState({ password: e.target.value })
  }

  login = () => {
    this.setState({
      loadingState: '登入中'
    },() => {
      firebase.database().ref('/backends').orderByChild('account').equalTo(this.state.account).once('value')
      .then((snap) => {
        const val = snap.val()
        if (val) {
          const user = Object.values(val)[0]
          if ((user.password.toString() === this.state.password) && (!user.nonuse)) {
            this.props.HoldemStore.setUser(true,user.resource,this.state.account)
          } else {
            this.loginError()
          }
        } else {
          this.loginError()
        }
      })      
    })
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
	          validationState={this.getValidationState()}
	        >
	          <FormControl
	            type="text"
	            value={this.state.account}
	            placeholder="請輸入您的帳號"
	            onChange={this.setAccount}
	          />
	          <FormControl.Feedback />
	        </FormGroup>
          <FormGroup>
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