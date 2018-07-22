// node_module
import React, { Component } from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import PartialButton from './PartialButton'
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
          <PartialButton onClick={onClickSearchPageLeftButton}>{leftButtonTitle}</PartialButton>
          <PartialButton onClick={onClickSearchPageRightButton}>{rightButtonTitle}</PartialButton>
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
  }
}
export default ButtonSearchPage