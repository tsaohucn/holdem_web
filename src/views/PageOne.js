// node_module
import React from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
// local components
const PageOne = (props) =>  {

  const { 
    onClick, 
    buttonLeftTitle, 
    buttonRightTitle 
  } = props ? props : {}

  return(
    <div>
      <h1>俱樂部查詢</h1>
      <div style={styles.searchView}>
        <SearchBar
          style={styles.SearchBar}
          value={''}
          //onChange={this.onChange}
          //onRequestSearch={this.searchClub}
        />
      </div>
      <br/>
      <div style={styles.buttonView}>
        <div style={styles.buttonSlit}>
          <Button style={styles.button} variant="contained" color="secondary">{buttonLeftTitle}</Button>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClick}>{buttonRightTitle}</Button>
        </div>
      </div> 
    </div>
  )
}

const styles = {
  searchView: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center'
  },
  SearchBar: {
    flex: 1
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  buttonSlit: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '35%',
  },
  button: {
    width: '40%'
  }
}
export default PageOne