import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
// local components
import PartialButton from './PartialButton'

const ChangePassword = (props) => {
  const {
    onClickCancelButton,
    onClickConfirmButton
  } = props ? props : {}

  return(
    <div>
      <div>
        <TextField
          label={'請輸入原始密碼'}
          id="margin-normal"
          style={styles.textField}
          margin="normal"
          //value={value[key]}
          //onChange={(event) => { onChange(event,key) }}
        />
      </div>
      <div>
        <TextField
          label={'請輸入新密碼'}
          id="margin-normal"
          style={styles.textField}
          margin="normal"
          //value={value[key]}
          //onChange={(event) => { onChange(event,key) }}
        />
      </div>
      <br/>
      <div style={styles.buttonView}>
        <PartialButton 
          style={styles.button} 
          variant="contained" 
          color="secondary" 
          onClick={onClickCancelButton}
          >
          {'返回'}
        </PartialButton>
        <PartialButton 
          style={styles.button} 
          variant="contained" 
          color="secondary" 
          onClick={onClickConfirmButton}
        >
          {'確認'}
        </PartialButton>
      </div>
      <br/>
    </div>
  )
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

export default ChangePassword