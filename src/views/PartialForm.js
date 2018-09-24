// node_module
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
// local components
import PartialButton from '../views/PartialButton'

const PartialForm = (props) => {
  const { 
    field,
    buttonTitle,
    onClickNewPageButton,
    onClickNewPageReturn,
    onChange,
    value
  } = props ? props : {}

  const renderSelect = (property) => {
    return props[property] && props[property].map(option => (
      <MenuItem key={option.key} value={option.key}>
        {option.name}
      </MenuItem>
    ))
  }

  return(
    <div>
      {
        field.map(ele => 
          {
            const { key, label } = ele ? ele : {}
            const isSelect = key === 'club' || key === 'referee' || key === 'sale' 
            return(
              <div key={key}>
                <TextField
                  select={isSelect}
                  label={label}
                  id="margin-normal"
                  style={styles.textField}
                  margin="normal"
                  value={value[key]}
                  onChange={(event) => { onChange(event,key) }}
                > 
                {
                  isSelect ? renderSelect(key) : null
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
          onClick={onClickNewPageButton}
        >
          {buttonTitle}
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

export default PartialForm