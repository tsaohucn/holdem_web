// node module
import React, { Component } from 'react'
import { 
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
  Button
} from 'react-bootstrap'
import { withAlert } from 'react-alert'
import { inject, observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import validator from "email-validator"
// local components
import firebase from '../configs/firebase'
import { errorAlert, successAlert } from '../helpers'

class WelcomeScreen extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      account: '',
      password:'',
      loadingState: '登入'
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
    },async () => {
      try {
        const account_snap = await firebase.firestore().collection("backends")
          .where("account", "==", this.state.account)
          .where("password", "==", this.state.password)
          .where("quit", "==", false)
          .get()
        const account_size = account_snap.size
        if (account_size === 1) {
          const user = account_snap.docs.map(doc => doc.data())[0]
          this.props.HoldemStore.setUser({
            isAuth: true,
            resource: user.resource,
            id: user.id,
            account: user.account,
            password: user.password,
            clubKey: user.club_key,
            clubId: user.club_id
          })
        } else if (account_size === 0) {
          throw '無此使用者'
        } else if (account_size > 1) {
          throw '出現重複使用者'
        } else {
          throw '系統錯誤'
        }
      } catch (err) {
        errorAlert(this.props.alert,'登入錯誤 : ' + err.toString())
      } finally {
        this.setState({
          loadingState: '登入'
        })
      }    
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
            <Button onClick={this.login}>{this.state.loadingState}</Button>
          </div>
	      </form>
      </Grid>
    )
  }
}

export default inject("HoldemStore")(withAlert(WelcomeScreen))

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