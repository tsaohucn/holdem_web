// node_module
import React from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'
import config from '../../configs/config'

class RefereeScreen extends React.Component {

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
        <div style={styles.textFieldBlock}>
          {
            config['referee'].map(ele =>
            <div>
              <TextField
                label={ele}
                id="margin-normal"
                style={styles.textField}
                margin="normal"
              />
            </div>
            )
          }
          <Button style={styles.button} variant="contained" color="secondary" onClick={this.addNewClub}>確認新增裁判</Button>
        </div>
      )
    } else {
      return(
        <div>
          <h1>裁判代號查詢</h1>
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
              <Button style={styles.button} variant="contained" color="secondary" onClick={this.goToAddNewClub}>新增裁判</Button>
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

RefereeScreen.propTypes = {
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
  },
  textFieldBlock: {
    overflow: 'scroll'//display: 'flex',
  }
}
export default withHoldemBar(RefereeScreen);