// node_module
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ReactTooltip from 'react-tooltip'
// local components
import PartialButton from './PartialButton'
import {   
  getSpendTime,
  getTenMinutes,
  getTotalSpendTime,
  getScore
} from '../helpers'

const PartialTable = (props) =>  {

  const {
    Title, 
    title,
    data,
    onClickTableReturnButton,
    onClickRefereeReportDate,
    onClickRefereeDayReportTableId,
    onClickCount,
    onClickEdit,
    saleReportTotalPlayerSpendTime
  } = props ? props : {}

  const renderData = (data) => (
    data.map((n,index) => {
      return (
        <TableRow key={index.toString()}>
          {
            title && title.map(ele => {
              const key = ele.key
              if (key !== 'edit') {
                if (count.includes(key)) {
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      <a style={styles.link} onClick={() => onClickCount && onClickCount(key,n.id)}>
                        {n[key]}
                      </a>
                    </TableCell>
                  )
                } else if (key === 'chipGrap') {
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      <a data-tip data-for={n['key']}>{'明細'}</a>
                      <ReactTooltip id={n['key']} type='error' effect='solid'>
                        <ol style={styles.ol}>
                          { Object.values(n[key] || {}).map((ele) =>
                            <li>{ele}</li>
                          )}
                        </ol>
                      </ReactTooltip> 
                    </TableCell>
                  )
                } else if (key === 'spendTime') {
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      {getSpendTime(n['spendTime'])}
                    </TableCell>
                  )
                } else if (key === 'tenMinutes') {
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      {getTenMinutes(n['spendTime'])}
                    </TableCell>
                  )
                } else if (key === 'saleReportTotalPlayerSpendTime') {
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      {getTotalSpendTime(saleReportTotalPlayerSpendTime[n['playerDate'] + '_' + n['member_referee_id']])}
                    </TableCell>
                  )
                } else if (key === 'refereeDayReportTotalPlayerSpendTime') {
                  return (
                    <TableCell key={key} style={styles.tableCell}>
                      {getTotalSpendTime(n[key])}
                    </TableCell>
                  )
                } else if (key === 'score') {
                  return(
                    <TableCell key={key} style={styles.tableCell}>
                      {getScore(saleReportTotalPlayerSpendTime[n['playerDate'] + '_' + n['member_referee_id']],n['table_level'])}
                    </TableCell>
                  )
                } else if (key === 'referee_report_date') {
                  return(
                    <TableCell key={key} style={styles.tableCell}>
                      <a style={styles.link} onClick={() => onClickRefereeReportDate && onClickRefereeReportDate(n[key])}>
                        {n[key]}
                      </a>
                    </TableCell>
                  )
                } else if (key === 'referee_day_report_table_id') {
                  return(
                    <TableCell key={key} style={styles.tableCell}>
                      <a style={styles.link} onClick={() => onClickRefereeDayReportTableId && onClickRefereeDayReportTableId(n[key])}>
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
                    <a style={styles.link} onClick={() => onClickEdit && onClickEdit(n.key)}>
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
      {
        Title ? <h4>{Title}</h4> : <br/> 
      }
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
            { renderData(data) }
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
  ol: {
    paddingLeft: '0', 
    listStylePosition: 'inside'
  },
  tooltip: {
    color: 'red',
    fontSize: '50px'
  },
  modal: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: '50%',
    height: '50%',
    backgroundColor: '#FFFFFF',
    boxShadow: 5,
    padding: 4
  },
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  chipGrapTable: {
    minWidth: '50%',
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

/*

                if (key === 'referee_report_date') {
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
                    */