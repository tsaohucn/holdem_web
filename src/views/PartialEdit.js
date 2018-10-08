// node_module
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
// local components
import PartialButton from './PartialButton'

const PartialEdit = (props) =>  {

  const { 
    deleteModalIsShow,
    title,
    onClickEditReturnButton,
    onClickEditConfirmButton,
    onClickConfirmDelete,
    data,
    onChangeData
  } = props ? props : {}

    return(
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={deleteModalIsShow || false}
          //onClose={this.cancelDelete}
          style={styles.modal}
        >
          <div style={styles.modalView}>
            <div style={styles.modalTitle}>
              <p>是否確定刪除</p>
            </div>
            <div style={styles.modalButtonView}>
              <PartialButton 
                //onClick={this.cancelDelete}
              >
                否
              </PartialButton> 
              <PartialButton 
                //onClick={this.confirmDelete}
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
              <TableRow>
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
                            defaultValue={data[key]}
                            value={data[key]}
                            onChange={(event) => {
                              const value = event.target.value
                              onChangeData(key,value)}
                            }
                          />
                        </TableCell>
                      )
                    } else {
                      if (options.includes(key)) {
                        return (
                          <TableCell key={key} style={styles.tableCell}>
                            <TextField
                              select
                              style={styles.tableCell}
                              value={data[key]}
                              onChange={(event) => {
                                const value = event.target.value
                                onChangeData(key,value)}
                              }                              
                            > 
                              { renderSelect(props[key]) }
                            </TextField>
                          </TableCell>
                        )//選單
                      } else if (key === 'delete') {
                        return (
                          <TableCell key={key} style={styles.tableCell}>
                            <a style={styles.link} onClick={onClickConfirmDelete}>
                              {'刪除'}
                            </a>
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={key} style={styles.tableCell}>
                            {data[key]}
                          </TableCell>
                        )// 固定
                      }
                    }
                  })
                }
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <br/>
        <div style={styles.buttonView}>
          <PartialButton 
            onClick={onClickEditReturnButton}
          >
            返回
          </PartialButton> 
          <PartialButton 
            onClick={onClickEditConfirmButton}
          >
            確認
          </PartialButton>
        </div>
        <br/>
        <br/>
      </div>
    )

}

const renderSelect = (data) => (
  data.map(option => (
    <MenuItem key={option.id} value={option.id}>
      { option.id_name }
    </MenuItem>
  ))
)

const noTextInput = [
  'club_id',
  'referee_id',
  'sale_id',
  'id',
  'delete'
]

const options = [
  'club_id',
  'referee_id',
  'sale_id' 
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

export default PartialEdit
