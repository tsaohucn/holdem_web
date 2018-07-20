// node_module
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
// local components
const TablePage = (props) =>  {

  const { 
    title,
    tableData,
    onClickTableReturnButton,
    onClickTableConfirmButton,
    onClickEdit,
    onClickDelete,
    showTableConfirmButton
  } = props ? props : {}

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
                {tableData && Object.values(tableData).map((n,index) => {
                  return (
                    <TableRow key={index.toString()}>
                      {
                        title && title.map(ele => {
                          if (ele.key === 'edit') {
                            return <TableCell><a onClick={onClickEdit}>{'編輯'}</a></TableCell>
                          } else if (ele.key === 'delete') {
                            return <TableCell><a onClick={onClickDelete}>{'刪除'}</a></TableCell>
                          } else {
                            return <TableCell>{n[ele.key]}</TableCell>
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
            {
              showTableConfirmButton && <Button style={styles.button} variant="contained" color="secondary" onClick={onClickTableConfirmButton}>確認</Button>
            }
          </div>
          <br/>
          <br/>
        </div>
  )
}

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
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
export default TablePage