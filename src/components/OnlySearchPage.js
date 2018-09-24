// node_module
import React, { PureComponent } from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import PartialButton from '../views/PartialButton'
// local components

class OnlySearchPage extends PureComponent {

  onChangeSearchValue = (value) => {
    this.searchValue = value
  }

  onClickSearchPageLeftButton = () => {
    this.props.onClickSearchPageLeftButton && this.props.onClickSearchPageLeftButton(this.searchValue || '$all')
  }

  render() {

    const { 
      leftButtonTitle, 
      title
    } = this.props

    return(
      <div>
        <br/>
        <div style={styles.searchBlock}>
          <h4 style={styles.SearchTitle}>{title}</h4>
          <SearchBar
            style={styles.SearchBar}
            value={''}
            placeholder={'dsddsd'}
            onChange={this.onChangeSearchValue}
            onRequestSearch={() => {}}
          />
        </div>
        <br/>
        <div style={styles.buttonView}>
          <PartialButton style={styles.button} variant="contained" color="secondary" onClick={this.onClickSearchPageLeftButton}>{leftButtonTitle}</PartialButton>
        </div>
        <br/> 
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
export default OnlySearchPage
