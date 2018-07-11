// node_module
import React from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class ClubScreen extends React.Component {

	constructor(props) {
    super(props)
    this.state = {
      page: 1,
    	search: ''
    }
	}

  searchClub() {
  	//
  }

  onChange = (newValue) => this.setState({ search: newValue })

  goToAddNewClub = () => {
    this.setState({
      page: 2
    })
  }

  addNewClub = () => {
    this.setState({
      page: 1
    })    
  }

  renderContent = () => {
    if (this.state.page === 2) {
      return(
        <div>
          <div>
            <TextField
              label="俱樂部名稱"
              id="margin-normal"
              //defaultValue="club"
              style={styles.textField}
              //helperText="俱樂部名稱"
              margin="normal"
            />
          </div>
          <div>
            <TextField
              label="俱樂部帳號"
              id="margin-normal"
              //defaultValue="account"
              style={styles.textField}
              //helperText="俱樂部帳號"
              margin="normal"
            />
          </div>
          <div>
            <TextField
              label="俱樂部密碼"
              id="margin-normal"
              //defaultValue="12345"
              style={styles.textField}
              //helperText="俱樂部密碼"
              margin="normal"
            />
          </div>
          <Button style={styles.button} variant="contained" color="secondary" onClick={this.addNewClub}>確認新增俱樂部</Button>
        </div>
      )
    } else {
      return(
        <div>
          <h1>俱樂部查詢</h1>
          <div style={styles.searchView}>
            <SearchBar
              style={styles.SearchBar}
              value={this.state.search}
              onChange={this.onChange}
              onRequestSearch={this.searchClub}
            />
          </div>
          <br/>
          <div style={styles.buttonView}>
            <div style={styles.buttonSlit}>
              <Button style={styles.button} variant="contained" color="secondary">搜索</Button>
              <Button style={styles.button} variant="contained" color="secondary" onClick={this.goToAddNewClub}>新增俱樂部</Button>
            </div>
          </div> 
        </div>
      )    
    }
  }

  render() {
    return(
    	<div>
       {
        this.renderContent()
       }
		  </div>
    )
  }
}

ClubScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

const styles = {
  container: {
    //
  },
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
  },
  textField: {
    width: '40%'
  }
}

export default withHoldemBar(ClubScreen);