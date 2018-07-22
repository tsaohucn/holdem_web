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

class EditComponent extends PureComponent {

  state = this.props.data || {}

  onChange = (index,key,value) => {
    const keys = this.getKeys()
    const data = this.state
    const _key = keys[index]
    data[_key][key] = value
    this.setState(data)
  }

  onClickDelete = (index) => {
    const keys = this.getKeys()
    const data = Object.assign({},this.state)
    const _key = keys[index]
    data[_key] = null
    this.setState(data)
  }

  getKeys = () => {
    return Object.keys(this.state).filter(key => this.state[key])
  }

  onClickEditConfirmButton = () => {
    this.props.onClickEditConfirmButton(this.state)
  }

  render() {

    const { 
      title,
      onClickTableReturnButton
    } = this.props ? this.props : {}

    const keys = this.getKeys()

    return(
      <div>
        <br/>
        <Paper style={styles.root}>
          <Table style={styles.table}>
            <TableHead>
              <TableRow>
                {
                  title && title.map(ele => 
                    {
                      if (ele.key !== 'memberCount') {
                        return <TableCell style={styles.tableCell} key={ele.key}>{ele.label}</TableCell>
                      } else {
                        return null
                      }
                    }
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(this.state).filter(x => x).map((n,index) => {
                return (
                  <TableRow key={keys[index]}>
                    {
                      title && title.map((ele) => {
                        const key = ele.key
                        if (key !== 'delete' && key !== 'clubs' && key !== 'memberCount') {
                          return (
                            <TableCell
                              key={key}
                              style={styles.tableCell}
                            >
                              <TextField
                                style={styles.tableCell}
                                defaultValue={n[key]}
                                //id="bootstrap-input"
                                //InputProps={{
                                //  disableUnderline: true
                                //}}
                                //InputLabelProps={{
                                //  shrink: true
                                //}}
                                onChange={event => {
                                  const value = event.target.value
                                  this.onChange(index,key,value)
                                }}
                              />
                            </TableCell>
                          )
                        } else {
                          if (key === 'delete') {
                            return <TableCell key={key} style={styles.tableCell}><a onClick={() => this.onClickDelete(index)}>{'刪除'}</a></TableCell>
                          } else if (key === 'clubs') {
                            return <TableCell key={key} style={styles.tableCell}>{n[key]}</TableCell> //選單
                          } else if (key === 'memberCount') {
                            return null
                          }
                        }
                      })
                    }
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <br/>
        <div style={styles.buttonView}>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickTableReturnButton}>返回</Button> 
          <Button style={styles.button} variant="contained" color="secondary" onClick={this.onClickEditConfirmButton}>確認</Button>
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
  },
  tableCell: {
    fontSize: 13
  }
}
export default EditComponent