// node_module
import React, { PureComponent } from 'react'
import * as EmailValidator from 'email-validator'
// local components
import PartialForm from '../views/PartialForm'
import { errorAlert, passwordSchema } from '../helpers'

class FormComponent extends PureComponent {

  state = this.props.field.reduce(function(o, ele) { o[ele.key] = ''; return o; }, {})

  checkDataIntegrity = () => {
    const values =  Object.values(this.state)
    const index = values.findIndex(value => (value === null || value === undefined || value === ''))
    if (index < 0) {
      return true
    } else {
      const message = this.props.field[index].label + '不能為空'
      errorAlert(this.props.alert,message)
      return false      
    }
  }

  checkEmailFormat = () => {
    if (EmailValidator.validate(this.state.account)) {
      return true
    } else {
      const message = '帳號格式錯誤'
      errorAlert(this.props.alert,message)
      return false        
    }
  }

  checkPasswordFormat = () => {
    if (passwordSchema.validate(this.state.password)) {
      return true
    } else {
      const message = '密碼格式錯誤'
      errorAlert(this.props.alert,message)
      return false       
    } 
  }

  onChange = (event,key) => {
    const state = {
      [key]: event.target.value
    }
    this.setState(state)
  }

  onClickNewPageButton = () => {
    if (this.checkDataIntegrity()) {
      if (this.checkEmailFormat()) {
        if (this.checkPasswordFormat()) {
          this.props.onClickNewPageButton && this.props.onClickNewPageButton(this.state)
        }
      }
    }
  }
 
  render() {
    return(
      <PartialForm
        {...this.props}
        value={this.state}
        onChange={this.onChange}
        onClickNewPageButton={this.onClickNewPageButton}
      />
    )    
  }
}

export default FormComponent