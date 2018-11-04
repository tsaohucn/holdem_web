// node_module
import React, { PureComponent } from 'react'
import * as EmailValidator from 'email-validator'
import Moment from 'moment'
// local components
import PartialForm from '../views/PartialForm'
import { errorAlert, passwordSchema } from '../helpers'

class FormComponent extends PureComponent {

  constructor(props) {
    super(props)
  
    this.state = {
      data: this.props.field.reduce((o, ele) => { 
        if (ele.key === 'club_key') {
          o[ele.key] = this.props.clubKey
        } else if (ele.key === 'joinDate') {
          o[ele.key] = Moment(new Date()).format('l')
        } else {
          o[ele.key] = ''
        }
        return o
      }, {}),
      focusBirthday: false
    }
  }

  checkDataIntegrity = () => {
    const values =  Object.values(this.state.data)
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
    if (this.state.data.account) {
      if (EmailValidator.validate(this.state.data.account)) {
        return true
      } else {
        const message = '帳號格式錯誤'
        errorAlert(this.props.alert,message)
        return false        
      }
    } else {
      return true
    }
  }

  checkPasswordFormat = () => {
    if (this.state.data.password) {
      if (passwordSchema.validate(this.state.data.password)) {
        return true
      } else {
        const message = '密碼格式錯誤'
        errorAlert(this.props.alert,message)
        return false       
      }
    } else {
      return true
    }
  }

  checkLimitFormat = () => {
    if (this.state.data.chipLimit) {
      if (Number.isInteger(parseInt(this.state.data.chipLimit))) {
        if (parseInt(this.state.data.chipLimit) >= 0) {
          return true
        } else {
          const message = '抓馬額度格式錯誤'
          errorAlert(this.props.alert,message)
        }
      } else {
        const message = '抓馬額度格式錯誤'
        errorAlert(this.props.alert,message)
        return false         
      }
    } else {
      return true
    }
  }

  checkRbPercentage = () => {
    if (this.state.data.rbPercentage) {
      if (Number.isInteger(parseInt(this.state.data.rbPercentage))) {
        if ((parseInt(this.state.data.rbPercentage) >= 0) && (parseInt(this.state.data.rbPercentage) <= 100)) {
          return true
        } else {
          const message = '退回協會趴數格式錯誤'
          errorAlert(this.props.alert,message)
          return false 
        }
      } else {
        const message = '退回協會趴數格式錯誤'
        errorAlert(this.props.alert,message)
        return false         
      }
    } else {
      return true
    }    
  }

  onChange = (event,key) => {
    const value = event.target.value
    const data = Object.assign({},this.state.data,{ [key]: value })
    this.setState({
      data
    })
  }

  onClickNewPageButton = () => {
    if (this.checkDataIntegrity()) {
      if (this.checkEmailFormat()) {
        if (this.checkPasswordFormat()) {
          if (this.checkLimitFormat()) {
            if (this.checkRbPercentage()) {
              this.props.onClickNewPageButton && this.props.onClickNewPageButton(this.state.data)
            }
          }
        }
      }
    }
  }

  onFocusBirthday = () => {
    this.setState({
      focusBirthday: true
    })
  }

  onBlurBirthday = () => {
    this.setState({
      focusBirthday: false
    })
  }
 
  render() {
    return(
      <PartialForm
        {...this.props}
        focusBirthday={this.state.focusBirthday}
        onBlurBirthday={this.onBlurBirthday}
        onFocusBirthday={this.onFocusBirthday}
        data={this.state.data}
        onChange={this.onChange}
        onClickNewPageButton={this.onClickNewPageButton}
      />
    )    
  }
}

export default FormComponent