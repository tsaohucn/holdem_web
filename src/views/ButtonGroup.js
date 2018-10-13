// node_module
import React from 'react'
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search'
import PartialButton from './PartialButton'

const ButtonGroup = (props) => {

    const { 
        onClickSearchPageRightButton,
        onClickSearchPageLeftButton,
        leftButtonTitle, 
        rightButtonTitle,
    } = props

    const onClickLeftButton = () => {
        onClickSearchPageLeftButton && onClickSearchPageLeftButton('$all')
    }

    return(
        <div>
            <br/>
            <div style={styles.buttonView}>
                <PartialButton onClick={onClickLeftButton}>{leftButtonTitle}</PartialButton>
                <PartialButton onClick={onClickSearchPageRightButton}>{rightButtonTitle}</PartialButton>
            </div>
        </div>
    )
}

const styles = {
    searchBlock: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center'
    },
    SearchBar: {
        flex: 6
    },
    SearchTitle: {
        flex: 1
    },
    buttonView: {
        width: '25%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}
export default ButtonGroup