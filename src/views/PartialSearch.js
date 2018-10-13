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
import PartialButton from '../views/PartialButton'

const PartialSearch = (props) => {
    const { 
        onClickSearchPageLeftButton,
        onClickSearchPageRightButton, 
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
        <div>
            <br/>
            {
                showRadioBox &&       
        <div>
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
                <h4 style={styles.SearchTitle}>{title}</h4>
                <SearchBar
                    style={styles.SearchBar}
                    value={''}
                    placeholder={placeholder}
                    onChange={onChangeSearchValue}
                    onRequestSearch={() => {}}
                />
            </div>
            <br/>
            <div style={styles.buttonView}>
                <PartialButton 
                    onClick={onClickSearchPageLeftButton}
                >
                    {leftButtonTitle}
                </PartialButton>
                {
                    showRightButton && 
          <PartialButton 
              onClick={onClickSearchPageRightButton}
          >
              {rightButtonTitle}
          </PartialButton>
                }
            </div>
        </div>
    )  
}


const styles = {
    searchBlock: {
        display: 'flex', 
        flexDirection: 'column',
        width: '50%'
    },
    SearchBar: {
        flex: 6
    },
    SearchTitle: {
        flex: 1
    },
    buttonView: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '33%',
        minWidth: 0,
        fontSize: 15
    },
    radioView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export default PartialSearch