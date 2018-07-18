// node_module
import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
// local components
class NewPage extends PureComponent {

  state = this.props.field.reduce(function(o, ele) { o[ele.key] = ''; return o; }, {})

  checkDataIntegrity() {
    const values =  Object.values(this.state)
    const index = values.findIndex(value => (!value || value === ''))
    console.warn(values)
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

  renderClubSelect = () => {
    return this.props.clubOptions && this.props.clubOptions.map(option => (
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
              const isSelect = key === 'club'
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
                    isSelect ? this.renderClubSelect() : null
                  }
                  </TextField>
                </div>
              )
            }
          )
        }
        <br/>
        <div style={styles.buttonView}>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickNewPageReturn}>{'返回'}</Button>
          <Button style={styles.button} variant="contained" color="secondary" onClick={this.onClick}>{buttonTitle}</Button>
        </div>
        <br/>
      </div>
    )    
  }
}


const styles = {
  textField: {
    width: '40%'
  },
  buttonView: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '30%'
  }
}
export default NewPage