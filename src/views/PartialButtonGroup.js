// node_module
import React from 'react'
import PartialButton from './PartialButton'

const PartialButtonGroup = (props) => {

  const { 
    showRightButton,
    showLeftButton,
    leftButtonTitle,
    rightButtonTitle,
    onClickLeftButton,
    onClickRightButton,
  } = props

  return(
    <div style={styles.buttonView}>
      {
        showLeftButton &&       
        <PartialButton
          style={styles.button}
          variant="contained" 
          color="secondary" 
          onClick={onClickLeftButton}
        >
          {leftButtonTitle}
        </PartialButton>
      }
      {
        showRightButton && 
        <PartialButton
          style={styles.button}
          variant="contained" 
          color="secondary"
          onClick={onClickRightButton}
        >
          {rightButtonTitle}
        </PartialButton>
      }
    </div>
  )
}

const styles = {
  buttonView: {
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '33%',
    minWidth: 0,
    fontSize: 15
  }
}
export default PartialButtonGroup