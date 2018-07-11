// node_module
import React from 'react';
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
// local components
import withHoldemBar from '../../hocs/withHoldemBar'

class ClubScreen extends React.Component {

	constructor(props) {
    super(props)
    this.state = {
    	search: ''
    }
	}

  searchClub() {
  	//
  }

  onChange = (newValue) => this.setState({ search: newValue })

  render() {
    return(
    	<div style={styles.container}>
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
            <Button style={styles.button} variant="contained" color="secondary">新增俱樂部</Button>
          </div>
        </div>
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
    width: '20%'
  },
  button: {
    width: '40%'
  }
}

export default withHoldemBar(ClubScreen);