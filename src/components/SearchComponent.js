// node_module
import React, { PureComponent } from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import PartialButton from '../views/PartialButton'
// local components

class SearchComponent extends PureComponent {

  render() {

    const { 
      onClickSearchPageLeftButton,
      onClickSearchPageRightButton, 
      leftButtonTitle, 
      rightButtonTitle,
      title,
      showSecondSearchBar,
      secondBarTitle,
      secondButtonTitle
    } = this.props

    return(
      <div>
        <br/>
        <div style={styles.searchBlock}>
          <h4 style={styles.SearchTitle}>{title}</h4>
          <SearchBar
            style={styles.SearchBar}
            value={''}
            //onChange={this.onChange}
            //onRequestSearch={this.searchClub}
          />
        </div>
        <br/>
        <div style={styles.buttonView}>
          <PartialButton 
            onClick={onClickSearchPageLeftButton}
          >
            {leftButtonTitle}
          </PartialButton>
          <PartialButton 
            onClick={onClickSearchPageRightButton}
          >
            {rightButtonTitle}
          </PartialButton>
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
                //onChange={this.onChange}
                //onRequestSearch={this.searchClub}
              /> 
            </div>
            <br/> 
            <div style={styles.buttonView}>
              <PartialButton 
                onClick={onClickSearchPageLeftButton}
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
export default SearchComponent