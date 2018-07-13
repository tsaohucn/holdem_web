// node_module
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// local components
const NewPage = (props) =>  {
  // add new page
  const { 
    data,
    onClickPageTwoButton,
    buttonTitle
  } = props ? props : {}

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
            />
          </div>
        )
      }
      <Button style={styles.button} variant="contained" color="secondary" onClick={onClickPageTwoButton}>{buttonTitle}</Button>
    </div>
  )
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