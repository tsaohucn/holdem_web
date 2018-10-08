// node_module
import React, { PureComponent } from 'react'
// local components
import PartialEdit from '../views/PartialEdit'

class EditComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      data: this.props.data || {}
    }
  }
/*
  onChange = (_key,key,value) => {
    this.data[_key][key] = value
  }

  onClickDelete = (key) => {
    this.key = key
    this.setState({
      open: true
    })
  }

  confirmDelete = () => {
    this.setState({
      open: false
    },() => {
      this.props.confirmDelete && this.props.confirmDelete(this.key)
    })
  }

  cancelDelete = () => {
    this.setState({
      open: false
    })    
  }

  onClickTableConfirmButton = () => {
    this.props.onClickTableConfirmButton && this.props.onClickTableConfirmButton(this.data)
  }

  onClickJumpPage = (key,_key) => {
    switch(key) {
      case 'account':
        this.props.onClickAccount && this.props.onClickAccount(_key)
        break
      case 'password':
        this.props.onClickAccount && this.props.onClickPassword(_key)
        break
      case 'memberCount':
        this.props.onClickMemberCount && this.props.onClickMemberCount(_key)
        break
    }
  }
*/

  onChangeData = (key,value) => {
    const data = Object.assign({},this.state.data,{
      [key]: value
    })
    this.setState({
      data
    })
  }

  onClickEditConfirmButton = () => {
    this.props.onClickEditConfirmButton && this.props.onClickEditConfirmButton(this.state.data)
  }

  render() {
    return(
      <PartialEdit
        {...this.props}
        data={this.state.data}
        onChangeData={this.onChangeData}
        onClickEditConfirmButton={this.onClickEditConfirmButton}
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