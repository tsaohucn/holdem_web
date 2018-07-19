// node_module
import React, { PureComponent } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ResponsiveTable from 'material-ui-next-responsive-table'
// local components
const data = [
  {
    id: '1234',
    name: 'Foo',
    telephone: 112122,
    account: 'sass',
    password: 'sdsd',
    memberCount: 'dsdsd',
    clubName: 'ssas'
  },
  {
    id: '4567',
    name: 'Bar',
    telephone: 55555,
    account: 'sass',
    password: 'sdsd',
    memberCount: 'dsdsd',
    clubName: 'ewee'
  }
]

class EditPage extends PureComponent {

  state = { tableData: this.props.tableData }

  onChange = (index,key,value) => {
    const tableData = this.state.tableData
    tableData[index][key] = value
    this.setState({
      tableData: tableData
    })
    console.log(this.state)
  }

  render() {

    const { 
      title,
      onClickTableReturnButton,
      onClickTableConfirmButton,
      onClickDelete
    } = this.props ? this.props : {}
    console.log(this.state.tableData)
    return(
      <div>
        <br/>
        <Paper style={styles.root}>
          <Table style={styles.table}>
            <TableHead>
              <TableRow>
                {
                  title && title.map(ele => (
                    <TableCell key={ele.key}>{ele.label}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.tableData && this.state.tableData.map((n,index) => {
                return (
                  <TableRow key={index.toString()}>
                    {
                      title && title.map((ele) => {
                        if (ele.key === 'delete') {
                          return <TableCell key={ele.key}><a onClick={onClickDelete}>{'刪除'}</a></TableCell>
                        } else {
                          return (
                            <TableCell
                              key={ele.key}
                            >
                              <TextField
                              defaultValue={n[ele.key]}
                              id="bootstrap-input"
                              InputProps={{
                                disableUnderline: true
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              onChange={event => {
                                const key = ele.key
                                const value = event.target.value
                                this.onChange(index,key,value)
                              }}
                            />
                            </TableCell>
                          )
                        }
                      })
                    }
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <br/>
        <div style={styles.buttonView}>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickTableReturnButton}>返回</Button> 
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickTableConfirmButton}>確認</Button>
        </div>
        <br/>
        <br/>
      </div>
    )
  }
}

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
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
export default EditPage

/*

          <Table style={styles.table}>
            <TableHead>
              <TableRow>
                {
                  title && title.map(ele => (
                    <TableCell key={ele.key}>{ele.label}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData && tableData.map((n,index) => {
                return (
                  <TableRow key={index.toString()}>
                    {
                      title && title.map(ele => {
                        if (ele.key === 'delete') {
                          return <TableCell><a onClick={onClickDelete}>{'刪除'}</a></TableCell>
                        } else {
                          return (
                            <TableCell>
                              <TextField
                              defaultValue={n[ele.key]}
                              id="bootstrap-input"
                              InputProps={{
                                disableUnderline: true,
                                //classes: {
                                //  root: classes.bootstrapRoot,
                                //  input: classes.bootstrapInput,
                                //},
                              }}
                              InputLabelProps={{
                                shrink: true,
                                //className: classes.bootstrapFormLabel,
                              }}
                            />
                            </TableCell>
                          )
                        }
                      })
                    }
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
*/