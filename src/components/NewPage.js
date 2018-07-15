// node_module
import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
// local components
const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
]

class NewPage extends PureComponent {

  state = this.props.field.reduce(function(o, ele) { o[ele.key] = ''; return o; }, {})

  onChange(state) {
    this.setState(state)
  }

  onClick = () => {
    this.props.onClickNewPageButton && this.props.onClickNewPageButton(this.state)
  }

  renderSelect(flag) {
    if (flag) {
      return(
        this.props.options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      )
    }
  }
    
  render() {
    const { 
      field,
      buttonTitle
    } = this.props

    return(
      <div>
        {
          field.map(ele => 
            {
              const ifSelect = ele.key === 'club'
              return(
                <div key={ele.key}>
                  <TextField
                    select={ifSelect}
                    label={ele.label}
                    id="margin-normal"
                    style={styles.textField}
                    margin="normal"
                    value={this.state[ele.key]}
                    onChange={(event) => {
                      const state = {}
                      state[ele.key] = event.target.value
                      this.onChange(state)
                    }}
                  > 
                  {
                    this.renderSelect(ifSelect)
                  }
                  </TextField>
                </div>
              )
            }
          )
        }
        <Button style={styles.button} variant="contained" color="secondary" onClick={this.onClick}>{buttonTitle}</Button>
      </div>
    )    
  }
}


const styles = {
  textField: {
    width: '40%'
  },
  button: {
    width: '40%'
  }
}
export default NewPage