// node_module
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Autocomplete from 'react-autocomplete'
// local components
import PartialButton from '../views/PartialButton'
import SearchableDropdown from '../components/SearchableDropdown'

const PartialForm = (props) => {
  const { 
    field,
    buttonTitle,
    onClickNewPageButton,
    onClickNewPageReturn,
    onChange,
    data,
    clubId,
    onFocusBirthday,
    onBlurBirthday,
    focusBirthday,
    onSearch
  } = props ? props : {}

  const renderSelect = (property) => {
    return props[property] && props[property].map(option => (
      <MenuItem key={option.key} value={option.key}>
        { option.id_name }
      </MenuItem>
    ))
  }

  return(
    <div style={styles.container}>
      {
        field.map(ele => 
        {
          const { key, label, helperText } = ele ? ele : {}
          const isSelect = options.includes(key)
          const isSearch = search.includes(key)

          if (isSelect) {
            return(
              <TextField
                key={key}
                margin="normal"
                variant="outlined"
                select={isSelect}
                label={label}
                helperText={helperText}
                style={styles.textField}
                select
                value={data[key]}
                onChange={(event) => { onChange(event,key) }}
              > 
                { renderSelect(key) }
              </TextField>
            )
          } else if (isSearch) {
            return(
              <SearchableDropdown
                key={key}
                select={isSelect}
                label={label}
                helperText={helperText}
                items={props[key]}
                onSearch={(text) => { onSearch(text,key) }}
                value={data[key]}
                style={styles.textField}
              />
            )
          } else if (key === 'club_id') {
            return(
              <TextField
                key={key}
                margin="normal"
                variant="outlined"
                select={isSelect}
                label={label}
                helperText={helperText}
                style={styles.textField}
                disabled
                value={clubId}
              />
            )
          } else if (key === 'joinDate') {
            return(
              <TextField
                key={key}
                margin="normal"
                variant="outlined"
                select={isSelect}
                label={label}
                helperText={helperText}
                style={styles.textField}
                disabled
                value={data[key]}
              />
            )
          } else if (key === 'birthday') {
            return(
              <TextField
                key={key}
                margin="normal"
                variant="outlined"
                label={label}
                helperText={helperText}
                style={styles.textField}
                id="date"
                type="date"
                InputProps={{
                  onBlur: onBlurBirthday,
                  onFocus: onFocusBirthday,
                  style: focusBirthday ? {} : data[key] === '' ? styles.date : {}
                }}
                onChange={(event) => { onChange(event,key) }}
                value={data[key]}
              />
            )
          } else {
            return(
              <TextField
                key={key}
                margin="normal"
                variant="outlined"
                select={isSelect}
                label={label}
                helperText={helperText}
                style={styles.textField}
                value={data[key]}
                onChange={(event) => { onChange(event,key) }}
              /> 
            )              
          }
        }
        )
      }
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
    </div>
  )  
}

const options = [
  'gender',
  'education' 
]

const search = [
  'referee_id',
  'sale_id'
]

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    width: '50%',
    display: 'flex'
  },
  buttonView: {
    marginTop: 20,
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '33%',
    minWidth: 0
  },
  date: {
    color: 'transparent'
  }
}

export default PartialForm