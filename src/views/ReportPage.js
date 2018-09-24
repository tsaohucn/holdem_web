// node_module
import React, { Component } from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// local components

const ReportPage = (props) => {

    const { 
      leftButtonTitle,
      onClickSearchPageLeftButton
    } = props 
    
    return(
      <div>
        <br/>
        <div style={styles.dateView}>
          <p>{"查詢日期從 : "}</p>
          <form noValidate>
            <TextField
              style={styles.date}
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <p>{"至"}</p>
          <form noValidate>
            <TextField
              style={styles.date}
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </div>
         <FormControl component="fieldset">
            <FormGroup>
              <div>
                <FormControlLabel
                  control={
                    <Radio
                      //checked={this.state.gilad}
                      //onChange={this.handleChange('gilad')}
                      value="gilad"
                    />
                  }
                  label="會員姓名"
                />
                <TextField
                  id="margin-none"
                  defaultValue="Default Value"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Radio
                      //checked={this.state.jason}
                      //onChange={this.handleChange('jason')}
                      value="jason"
                    />
                  }
                  label="裁判代號"
                />
                <TextField
                  id="margin-none"
                  defaultValue="Default Value"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Radio
                      //checked={this.state.antoine}
                      //onChange={this.handleChange('antoine')}
                      value="antoine"
                    />
                  }
                  label="業務代號"
                />
                <TextField
                  id="margin-none"
                  defaultValue="Default Value"
                />
              </div>
            </FormGroup>
          </FormControl>
        <br/>
        <div style={styles.buttonView}>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickSearchPageLeftButton}>{leftButtonTitle}</Button>
        </div>
      </div>
    ) 
}
/*
class ReportPage extends Component {

  render() {

    const { 
      leftButtonTitle,
      onClickSearchPageLeftButton
    } = this.props

    return(
      <div>
        <br/>
        <div style={styles.dateView}>
          <p>{"查詢日期從 : "}</p>
          <form noValidate>
            <TextField
              style={styles.date}
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <p>{"至"}</p>
          <form noValidate>
            <TextField
              style={styles.date}
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </div>
         <FormControl component="fieldset">
            <FormGroup>
              <div>
                <FormControlLabel
                  control={
                    <Radio
                      //checked={this.state.gilad}
                      //onChange={this.handleChange('gilad')}
                      value="gilad"
                    />
                  }
                  label="會員姓名"
                />
                <TextField
                  id="margin-none"
                  defaultValue="Default Value"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Radio
                      //checked={this.state.jason}
                      //onChange={this.handleChange('jason')}
                      value="jason"
                    />
                  }
                  label="裁判代號"
                />
                <TextField
                  id="margin-none"
                  defaultValue="Default Value"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Radio
                      //checked={this.state.antoine}
                      //onChange={this.handleChange('antoine')}
                      value="antoine"
                    />
                  }
                  label="業務代號"
                />
                <TextField
                  id="margin-none"
                  defaultValue="Default Value"
                />
              </div>
            </FormGroup>
          </FormControl>
        <br/>
        <div style={styles.buttonView}>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickSearchPageLeftButton}>{leftButtonTitle}</Button>
        </div>
      </div>
    )
  }
}
*/

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
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row'
  },
  date: {
    marginLeft: 5, 
    marginRight: 5
  }
}

export default ReportPage