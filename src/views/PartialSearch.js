// node_module
import React from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
// local components
import PartialButton from '../views/PartialButton'

const PartialSearch = (props) => {
  const { 
    onClickSearchPageLeftButton,
    onClickSearchPageRightButton, 
    onClickSecondSearchButton,
    onChangeSearchValue,
    onChangeSecondSearchValue,
    leftButtonTitle, 
    rightButtonTitle,
    title,
    placeholder,
    secondPlaceholder,
    showSecondSearchBar,
    showRightButton,
    secondBarTitle,
    secondButtonTitle
  } = props

  return(
    <div>
      <br/>
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
      <br/> 
      {
        showSecondSearchBar ? 
        <div>
          <div style={styles.searchBlock}>
            <h4 style={styles.SearchTitle}>{secondBarTitle}</h4>
            <SearchBar
              style={styles.SearchBar}
              value={''}
              placeholder={secondPlaceholder}
              onChange={onChangeSecondSearchValue}
              onRequestSearch={() => {}}
            /> 
          </div>
          <br/> 
          <div style={styles.buttonView}>
            <PartialButton 
              onClick={onClickSecondSearchButton}
            >
              {secondButtonTitle}
            </PartialButton>
          </div>
        </div>
        : null
      }
    </div>
  )  
}


const styles = {
  searchBlock: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center'
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
  }
}

export default PartialSearch