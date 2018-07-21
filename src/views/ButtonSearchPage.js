// node_module
import React, { Component } from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
// local components

class ButtonSearchPage extends Component {

  render() {

    const { 
      onClickSearchPageLeftButton,
      onClickSearchPageRightButton, 
      leftButtonTitle, 
      rightButtonTitle,
    } = this.props

    return(
      <div>
        <br/>
        <div style={styles.buttonView}>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickSearchPageLeftButton}>{leftButtonTitle}</Button>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickSearchPageRightButton}>{rightButtonTitle}</Button>
        </div>
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
export default ButtonSearchPage