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
    onClickEdit,
    onClickDate,
    onClickTableId,
    id_names
  } = props ? props : {}

  const render = (data) => (
    data.map((n,index) => {
      return (
        <TableRow key={index.toString()}>
          {
            title && title.map(ele => {
              const key = ele.key
              if (key !== 'edit') {
                if (belong.includes(key)) {
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      {id_names[n[key]]}
                    </TableCell>
                  )
                } else if (key === 'referee_report_date') {
                    return (
                      <TableCell key={key} style={styles.tableCell}>
                        <a style={styles.link} onClick={() => onClickDate(n[key])}>
                          {n[key]}
                        </a>
                      </TableCell>
                    )
                } else if (key === 'referee_day_report_table_id') {
                    return (
                      <TableCell key={key} style={styles.tableCell}>
                        <a style={styles.link} onClick={() => onClickTableId(n[key])}>
                          {n[key]}
                        </a>
                      </TableCell>
                    )
                } else {
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      {n[key]}
                    </TableCell>
                  )
                }
              } else {
                return (
                  <TableCell key={key} style={styles.tableCell}>
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

const belong = [
  "club",
  "referee",
  "sale",
  "table_referee"
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

export default PartialTable