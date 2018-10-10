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

const getUserResource = (resource) => {
   switch(resource) {
    case 'admins':
      return '最高權限管理員'
      break
    case 'clubs':
      return '俱樂部管理員'
      break
    case 'employees':
      return '員工'
      break 
    case 'referees':
      return '裁判'
      break
    case 'sales':
      return '業務'
      break
    default:
      return '匿名'
      break     
   }
}

const PartialInformation = (props) =>  {

  const {
    resource,
    id,
    account,
    password,
    clubId,
    onClickTableReturnButton
  } = props ? props : {}

  return(
    <div>
      <br/>
      <Paper style={styles.root}>
        <Table style={styles.table}>
          <TableBody>
              <TableRow>
                 <TableCell style={styles.tableCell}>
                  {'權限'}
                 </TableCell>
                 <TableCell style={styles.tableCell}>
                  {getUserResource(resource)}
                 </TableCell>
              </TableRow>
              <TableRow>
                 <TableCell style={styles.tableCell}>
                  {'編號'}
                 </TableCell>
                 <TableCell style={styles.tableCell}>
                  {id}
                 </TableCell>
              </TableRow>
              <TableRow>
                 <TableCell style={styles.tableCell}>
                  {'帳號'}
                 </TableCell>
                 <TableCell style={styles.tableCell}>
                  {account}
                 </TableCell>
              </TableRow>
              <TableRow>
                 <TableCell style={styles.tableCell}>
                  {'密碼'}
                 </TableCell>
                 <TableCell style={styles.tableCell}>
                  {password}
                 </TableCell>
              </TableRow>
              <TableRow>
                 <TableCell style={styles.tableCell}>
                  {'所屬俱樂部'}
                 </TableCell>
                 <TableCell style={styles.tableCell}>
                  {clubId}
                 </TableCell>
              </TableRow>
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

const count = [
  'employeeCount',
  'memberCount',
  'refereeCount',
  'saleCount'
]

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

export default PartialInformation