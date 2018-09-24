// node_module
import React, { PureComponent } from 'react'
// local components
import PartialForm from '../views/PartialForm'
import { errorAlert } from '../helpers'

class FormComponent extends PureComponent {

  state = this.props.field.reduce(function(o, ele) { o[ele.key] = ''; return o; }, {})

  checkDataIntegrity() {
    const values =  Object.values(this.state)
    const index = values.findIndex(value => (!value || value === ''))
    if (index < 0) {
      return true
    } else {
      const message = this.props.field[index].label + '不能為空'
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
    const dataIsIntegrity = this.checkDataIntegrity()
    if (dataIsIntegrity) {
      this.props.onClickNewPageButton && this.props.onClickNewPageButton(this.state)
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