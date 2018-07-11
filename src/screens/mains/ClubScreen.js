// node_module
import React from 'react';
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search';
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

  render() {
    return(
    	<div style={{display: 'flex', flexDirection: 'row'}}>
    	  <h1>俱樂部查詢</h1>
			  <SearchBar
			    value={this.state.search}
			    onChange={(newValue) => this.setState({ search: newValue })}
			    onRequestSearch={this.searchClub}
			    closeIcon={<SearchIcon/>}
			  />
		  </div>
    )
  }
}

ClubScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(ClubScreen);