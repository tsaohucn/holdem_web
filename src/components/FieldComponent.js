// node_module
import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import PartialButton from '../views/PartialButton'
// local components
class FieldComponent extends PureComponent {

  state = this.props.field.reduce(function(o, ele) { o[ele.key] = ''; return o; }, {})

  checkDataIntegrity() {
    const values =  Object.values(this.state)
    const index = values.findIndex(value => (!value || value === ''))
    if (index < 0) {
      return true
    } else {
      const warning = this.props.field[index].label + '不能為空'
      this.props.alert.show(warning)
      return false      
    }
  }

  onChange(state) {
    this.setState(state)
  }

  onClick = () => {
    const dataIsIntegrity = this.checkDataIntegrity()
    if (dataIsIntegrity) {
      this.props.onClickNewPageButton && this.props.onClickNewPageButton(this.state)
    }
  }

  renderSelect = (property) => {
    return this.props[property] && this.props[property].map(option => (
      <MenuItem key={option.key} value={option.key}>
        {option.name}
      </MenuItem>
    ))
  }
 
  render() {
    const { 
      field,
      buttonTitle,
      onClickNewPageReturn
    } = this.props

    return(
      <div>
        {
          field.map(ele => 
            {
              const { key, label } = ele ? ele : {}
              const isSelect = key === 'clubs' || key === 'referees' || key === 'sales'
              return(
                <div key={key}>
                  <TextField
                    select={isSelect}
                    label={label}
                    id="margin-normal"
                    style={styles.textField}
                    margin="normal"
                    value={this.state[key]}
                    onChange={event => {
                      const state = {
                        [key]: event.target.value
                      }
                      this.onChange(state)
                    }}
                  > 
                  {
                    isSelect ? this.renderSelect(key) : null
                  }
                  </TextField>
                </div>
              )
            }
          )
        }
        <br/>
        <div style={styles.buttonView}>
          <PartialButton 
            style={styles.button} 
            variant="contained" 
            color="secondary" 
            onClick={onClickNewPageReturn}>
            {'返回'}
          </PartialButton>
          <PartialButton 
            style={styles.button} 
            variant="contained" 
            color="secondary" 
            onClick={this.onClick}
          >
            {buttonTitle}
          </PartialButton>
        </div>
        <br/>
      </div>
    )    
  }
}


const styles = {
  textField: {
    width: '50%'
  },
  buttonView: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '33%',
    minWidth: 0
  }
}
export default FieldComponent