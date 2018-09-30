// node_module
import React, { PureComponent } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import PartialButton from '../views/PartialButton'
import Modal from '@material-ui/core/Modal'
// local components

class EditComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.data = this.props.data
    this.key = null
  }

  onChange = (_key,key,value) => {
    this.data[_key][key] = value
  }

  onClickDelete = (key) => {
    this.key = key
    this.setState({
      open: true
    })
  }

  confirmDelete = () => {
    this.setState({
      open: false
    },() => {
      this.props.confirmDelete && this.props.confirmDelete(this.key)
    })
  }

  cancelDelete = () => {
    this.setState({
      open: false
    })    
  }

  onClickTableConfirmButton = () => {
    this.props.onClickTableConfirmButton && this.props.onClickTableConfirmButton(this.data)
  }

  onClickJumpPage = (key,_key) => {
    switch(key) {
      case 'account':
        this.props.onClickAccount && this.props.onClickAccount(_key)
        break
      case 'password':
        this.props.onClickAccount && this.props.onClickPassword(_key)
        break
      case 'id':
        this.props.onClickId && this.props.onClickId(_key)
        break
      case 'memberCount':
        this.props.onClickMemberCount && this.props.onClickMemberCount(_key)
        break
      default:
        break
    }
  }

  render() {

    const { 
      title,
      onClickTableReturnButton
    } = this.props ? this.props : {}

    return(
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.cancelDelete}
          style={styles.modal}
        >
          <div style={styles.modalView}>
            <div style={styles.modalTitle}>
              <p>是否確定刪除</p>
            </div>
            <div style={styles.modalButtonView}>
              <PartialButton 
                onClick={this.cancelDelete}
              >
                否
              </PartialButton> 
              <PartialButton 
                onClick={this.confirmDelete}
              >
                是
              </PartialButton>
            </div>
          </div>
        </Modal>
        <br/>
        <Paper style={styles.root}>
          <Table style={styles.table}>
            <TableHead>
              <TableRow>
                {
                  title && title.map(ele => 
                    {
                      return <TableCell style={styles.tableCell} key={ele.key}>{ele.label}</TableCell>
                    }
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.data).map((_key,index) => {
                return (
                  <TableRow key={_key}>
                    {
                      title && title.map((ele) => {
                        const key = ele.key
                        if (!noTextInput.includes(key)) {
                          return (
                            <TableCell
                              key={key}
                              style={styles.tableCell}
                            >
                              <TextField
                                style={styles.tableCell}
                                defaultValue={this.data[_key][key]}
                                onChange={event => {
                                  const value = event.target.value
                                  this.onChange(_key,key,value)
                                }}
                              />
                            </TableCell>
                          )
                        } else {
                          if (options.includes(key)) {
                            return (
                              <TableCell key={key} style={styles.tableCell}>
                                {this.data[_key][key]}
                              </TableCell>
                            )//選單
                          } else if (jumpPage.includes(key)) {
                            return (
                              <TableCell key={key} style={styles.tableCell}>
                                <a style={styles.link} onClick={() => this.onClickJumpPage(key,_key)}>
                                  {this.data[_key][key]}
                                </a>
                              </TableCell>
                            )
                          } else if (key === 'delete') {
                            return (
                              <TableCell key={key} style={styles.tableCell}>
                                <a style={styles.link} onClick={() => this.onClickDelete(_key)}>
                                  {'刪除'}
                                </a>
                              </TableCell>
                            )
                          } else {
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
          <PartialButton 
            onClick={onClickTableReturnButton}
          >
            返回
          </PartialButton> 
          <PartialButton 
            onClick={this.onClickTableConfirmButton}
          >
            確認
          </PartialButton>
        </div>
        <br/>
        <br/>
      </div>
    )
  }
}

const noTextInput = [
  'club_name',
  'referee_name',
  'sale_name',
  'account',
  'password',
  'id',
  'delete',
  'memberCount'
]

const options = [
  'club_name',
  'referee_name',
  'sale_name' 
]

const jumpPage = [
  'account',
  'password',
  'id',
  'memberCount'
]

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  buttonView: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tableCell: {
    fontSize: 13
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width: '20vw',
    height: '20vw',
    backgroundColor: '#FFFFFF',
    boxShadow: 5,
    borderRadius: 5
  },
  modalTitle: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalButtonView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none'
  }
}
export default EditComponent