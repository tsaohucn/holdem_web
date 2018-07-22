// node_module
import React from 'react'
import Button from '@material-ui/core/Button'
// local components
const PartialButton = (props) => 
  <Button 
    {...props}
    style={styles.button} 
    variant="outlined" 
    color="primary"
  >
    {props.children}
  </Button>


const styles = {
  button: {
    width: '33%',
    minWidth: 0,
    fontSize: 15
  }
}

export default PartialButton