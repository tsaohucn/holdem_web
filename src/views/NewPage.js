// node_module
import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// local components
class NewPage extends PureComponent {

  state = {
    name: '',
    account: '',
    password: ''
  }

  onChange(state) {
    this.setState(state)
  }

  onClick = () => {
    this.props.onClickNewPageButton && this.props.onClickNewPageButton(this.state)
  }
    
  render() {
    const { 
      data,
      buttonTitle
    } = this.props

    return(
      <div>
        {
          data.map(ele => 
            <div key={ele.key}>
              <TextField
                label={ele.label}
                id="margin-normal"
                style={styles.textField}
                margin="normal"
                onChange={(event) => {
                  const state = {}
                  state[ele.key] = event.target.value
                  this.onChange(state)
                }}
              />
            </div>
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