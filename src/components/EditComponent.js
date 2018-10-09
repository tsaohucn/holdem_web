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
    const values =  Object.values(this.state.data)
    const index = values.findIndex(value => (value === null || value === undefined || value === ''))
    if (index < 0) {
      return true
    } else {
      const message = this.props.title[index].label + '不能為空'
      errorAlert(this.props.alert,message)
      return false      
    }
  }

  checkEmailFormat = () => {
    if (EmailValidator.validate(this.state.data.account)) {
      return true
    } else {
      const message = '帳號格式錯誤'
      errorAlert(this.props.alert,message)
      return false        
    }
  }

  checkPasswordFormat = () => {
    if (passwordSchema.validate(this.state.data.password)) {
      return true
    } else {
      const message = '密碼格式錯誤'
      errorAlert(this.props.alert,message)
      return false       
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

  onClickEditConfirmButton = () => {
    if (this.checkDataIntegrity()) {
      if (this.checkEmailFormat()) {
        if (this.checkPasswordFormat()) {
          this.props.onClickEditConfirmButton && this.props.onClickEditConfirmButton(this.state.data)
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