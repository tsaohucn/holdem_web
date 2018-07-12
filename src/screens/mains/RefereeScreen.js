// node_module
import React from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
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

  goToAddNewReferee = () => {
    this.setState({
      page: 2
    })
  }

  addNewReferee = () => {
    this.setState({
      page: 1
    })    
  }

  goToSearchRefereeResult = () => {
    this.setState({
      page: 3
    })     
  }

  goBack = () => {
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
          <Button style={styles.button} variant="contained" color="secondary" onClick={this.addNewReferee}>確認新增裁判</Button>
          <br/>
          <br/>
        </div>
      )
    } else if (this.state.page === 3) {
      return(
        <div>
          <br/>
          <Paper style={styles.root}>
            <Table style={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell numeric>Calories</TableCell>
                  <TableCell numeric>Fat (g)</TableCell>
                  <TableCell numeric>Carbs (g)</TableCell>
                  <TableCell numeric>Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(n => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.calories}</TableCell>
                      <TableCell numeric>{n.fat}</TableCell>
                      <TableCell numeric>{n.carbs}</TableCell>
                      <TableCell numeric>{n.protein}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <br/>
          <Button style={styles.button} variant="contained" color="secondary" onClick={this.goBack}>返回</Button>
          <br/>
          <br/>
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
              <Button style={styles.button} variant="contained" color="secondary" onClick={this.goToSearchRefereeResult}>搜索</Button>
              <Button style={styles.button} variant="contained" color="secondary" onClick={this.goToAddNewReferee}>新增裁判</Button>
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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

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
  },
  root: {
    width: '100%',
    //marginTop: 5,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}
export default withHoldemBar(RefereeScreen);