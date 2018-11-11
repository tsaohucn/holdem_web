// node_module
import React, { PureComponent } from 'react'
import * as EmailValidator from 'email-validator'
// local components
import PartialEdit from '../views/PartialEdit'
import { errorAlert, passwordSchema } from '../helpers'

class EditComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      deleteModalIsShow: false,
      data: this.props.data || {}
    }
  }

  checkDataIntegrity = () => {
    const keys =  Object.keys(this.state.data)
    let key = keys.find(key => this.state.data[key] === null || this.state.data[key] === undefined || this.state.data[key] === '')
    if (!key) {
      return true
    } else {
      const ele = this.props.title.find(ele => ele.key === key)
      if (ele) {
        const label = ele.label
        const message =  label + '不能為空'
        errorAlert(this.props.alert,message)
      } else {
        const message = '不明錯誤'
        errorAlert(this.props.alert,message)
      }
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
    if (this.state.data.limit) {
      if (Number.isInteger(parseInt(this.state.data.limit))) {
        if (parseInt(this.state.data.limit) >= 0) {
          return true
        } else {
          const message = '抓馬額度格式錯誤'
          errorAlert(this.props.alert,message)
          return false
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

  confirmDelete = () => {
    this.setState({
      deleteModalIsShow: false
    },() => {
      this.props.confirmDelete && this.props.confirmDelete(this.state.data)
    })
  }

  cancelDelete = () => {
    this.setState({
      deleteModalIsShow: false
    })    
  }

  onClickDelete = () => {
    this.setState({
      deleteModalIsShow: true
    })
  }

  onChangeData = (key,value) => {
    const data = Object.assign({},this.state.data,{
      [key]: value
    })
    this.setState({
      data
    })
  }

  onSearch = (key,text) => {
    const data = Object.assign({},this.state.data,{
      [key]: text
    })
    this.setState({
      data
    })    
  }

  checkId = () => {
    if (this.state.data.referee_id) {
      if (!this.props.options[this.state.data.referee_id]) { 
        const message = '所屬裁判不存在'
        errorAlert(this.props.alert,message)
        return false 
      }
    }
    if (this.state.data.sale_id) {
      if (!this.props.options[this.state.data.sale_id]) {
        const message = '所屬業務不存在'
        errorAlert(this.props.alert,message)
        return false 
      }
    }
    return true 
  }

  onClickEditConfirmButton = () => {
    if (this.checkDataIntegrity()) {
      if (this.checkEmailFormat()) {
        if (this.checkPasswordFormat()) {
          if (this.checkLimitFormat()) {
            if (this.checkRbPercentage()) {
              if (this.checkId()) {
                this.props.onClickEditConfirmButton && this.props.onClickEditConfirmButton(this.state.data)
              }
            }
          }
        }
      }
    }
  }

  render() {
    return(
      <PartialEdit
        {...this.props}
        deleteModalIsShow={this.state.deleteModalIsShow}
        data={this.state.data}
        onChangeData={this.onChangeData}
        onClickEditConfirmButton={this.onClickEditConfirmButton}
        onClickDelete={this.onClickDelete}
        onSearch={this.onSearch}
        cancelDelete={this.cancelDelete}
        confirmDelete={this.confirmDelete}
      />
    )
  }
}

const noTextInput = [
  'club',
  'referee',
  'sale',
  'account',
  'password',
  'id',
  'delete',
  'memberCount'
]

const options = [
  'club',
  'referee',
  'sale' 
]

const jumpPage = [
  'account',
  'password',
  'memberCount'
]

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  buttonView: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tableCell: {
    fontSize: 13
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width: '20vw',
    height: '20vw',
    backgroundColor: '#FFFFFF',
    boxShadow: 5,
    borderRadius: 5
  },
  modalTitle: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalButtonView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none'
  }
}

export default EditComponent