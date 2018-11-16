// node_module
import React from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
// local components
import PartialButtonGroup from './PartialButtonGroup'

const PartialSearch = (props) => {
  const { 
    onClickLeftButton,
    onClickRightButton, 
    onChangeSearchValue,
    leftButtonTitle, 
    rightButtonTitle,
    title,
    placeholder,
    showRightButton,
    showRadioBox,
    radioOneTitle,
    radioTwoTitle,
    onClickRadio,
    radio
  } = props

  return(
    <div style={styles.container}>
      {
        showRadioBox &&       
        <div style={styles.showRadioBox}>
          <div style={styles.radioView}>
            <FormControlLabel
              control={
                <Radio
                  checked={radio['name']}
                  onChange={onClickRadio}
                  value="name"
                />
              }
            />
            <h4 style={styles.SearchTitle}>{radioOneTitle}</h4>
          </div>
          <div style={styles.radioView}>
            <FormControlLabel
              control={
                <Radio
                  checked={radio['referee_id']}
                  onChange={onClickRadio}
                  value="referee_id"
                />
              }
            />
            <h4 style={styles.SearchTitle}>{radioTwoTitle}</h4>
          </div>
        </div>
      }
      <div style={styles.searchBlock}>
        <h4>{title}</h4>
        <SearchBar
          value={''}
          placeholder={placeholder}
          onChange={onChangeSearchValue}
          onRequestSearch={() => {}}
        />
      </div>
      <PartialButtonGroup
        showLeftButton
        showRightButton={showRightButton}
        leftButtonTitle={leftButtonTitle}
        rightButtonTitle={rightButtonTitle}
        onClickLeftButton={onClickLeftButton}
        onClickRightButton={onClickRightButton}
      />
    </div>
  )  
}


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  showRadioBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchBlock: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  radioView: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center'
  }
}

export default PartialSearch