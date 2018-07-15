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
    data,
    onClickTablePageButton,
  } = props ? props : {}

  return(
        <div>
          <br/>
          <Paper style={styles.root}>
            <Table style={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell numeric>Calories</TableCell>
                  <TableCell numeric>Fat (g)</TableCell>
                  <TableCell numeric>Carbs (g)</TableCell>
                  <TableCell numeric>Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(n => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.calories}</TableCell>
                      <TableCell numeric>{n.fat}</TableCell>
                      <TableCell numeric>{n.carbs}</TableCell>
                      <TableCell numeric>{n.protein}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <br/>
          <Button style={styles.button} variant="contained" color="secondary" onClick={onClickTablePageButton}>返回</Button>
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
}
export default TablePage