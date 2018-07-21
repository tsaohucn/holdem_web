// node_module
import React, { Component } from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
// local components

class SearchPage extends Component {

  render() {

    const { 
      onClickSearchPageLeftButton,
      onClickSearchPageRightButton, 
      leftButtonTitle, 
      rightButtonTitle,
      title,
      showSecondSearchBar,
      secondBarTitle
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
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickSearchPageLeftButton}>{leftButtonTitle}</Button>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickSearchPageRightButton}>{rightButtonTitle}</Button>
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
              <Button style={styles.button} variant="contained" color="secondary" onClick={onClickSearchPageLeftButton}>{leftButtonTitle}</Button>
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
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '30%'
  }
}
export default SearchPage