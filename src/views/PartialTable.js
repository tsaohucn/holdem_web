// node_module
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
// local components
import PartialButton from './PartialButton'

const PartialTable = (props) =>  {

  const { 
    title,
    data,
    onClickTableReturnButton,
    onClickEdit
  } = props ? props : {}

  const render = (data) => (
    data && Object.values(data).map((n,index) => {
      return (
        <TableRow key={index.toString()}>
          {
            title && title.map(ele => {
              const key = ele.key
              if (key !== 'edit') {
                return (
                  <TableCell style={styles.tableCell}>
                    {n[key]}
                  </TableCell>
                )
              } else {
                return (
                  <TableCell style={styles.tableCell}>
                    <a style={styles.link} onClick={onClickEdit}>
                      {'編輯'}
                    </a>
                  </TableCell>
                )
              }
            })
          }
        </TableRow>
      )
    })
  )

  return(
    <div>
      <br/>
      <Paper style={styles.root}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              {
                title && title.map(ele => (
                  <TableCell style={styles.tableCell} key={ele.key}>{ele.label}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
             { render(data) }
          </TableBody>
        </Table>
      </Paper>
      <br/>
      <div style={styles.buttonView}>
        <PartialButton 
          onClick={onClickTableReturnButton}
        >
          {'返回'}
        </PartialButton> 
      </div>
      <br/>
      <br/>
    </div>
  )
}

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700,
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
  link: {
    textDecoration: 'none'
  }
}

export default PartialTable