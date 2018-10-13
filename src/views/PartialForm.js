// node_module
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
// local components
import PartialButton from '../views/PartialButton'

const PartialForm = (props) => {
    const { 
        field,
        buttonTitle,
        onClickNewPageButton,
        onClickNewPageReturn,
        onChange,
        value,
        clubId,
        joinDate
    } = props ? props : {}

    const renderSelect = (property) => {
        return props[property] && props[property].map(option => (
            <MenuItem key={option.key} value={option.key}>
                { option.id_name }
            </MenuItem>
        ))
    }

    return(
        <div style={styles.container}>
            {
                field.map(ele => 
                {
                    const { key, label, helperText } = ele ? ele : {}
                    const isSelect = options.includes(key)

                    if (isSelect) {
                        return(
                            <TextField
                                margin="normal"
                                variant="outlined"
                                select={isSelect}
                                label={label}
                                helperText={helperText}
                                style={styles.textField}
                                select
                                value={value[key]}
                                onChange={(event) => { onChange(event,key) }}
                            > 
                                { renderSelect(key) }
                            </TextField>
                        )
                    } else if (key === 'club_key') {
                        return(
                            <TextField
                                margin="normal"
                                variant="outlined"
                                select={isSelect}
                                label={label}
                                helperText={helperText}
                                style={styles.textField}
                                disabled
                                value={clubId}
                            />
                        )
                    } else if (key === 'joinDate') {
                        return(
                            <TextField
                                margin="normal"
                                variant="outlined"
                                select={isSelect}
                                label={label}
                                helperText={helperText}
                                style={styles.textField}
                                disabled
                                value={joinDate}
                            />
                        )
                    } else {
                        return(
                            <TextField
                                margin="normal"
                                variant="outlined"
                                select={isSelect}
                                label={label}
                                helperText={helperText}
                                style={styles.textField}
                                value={value[key]}
                                onChange={(event) => { onChange(event,key) }}
                            /> 
                        )              
                    }
                }
                )
            }
            <div style={styles.buttonView}>
                <PartialButton 
                    style={styles.button} 
                    variant="contained" 
                    color="secondary" 
                    onClick={onClickNewPageReturn}>
                    {'返回'}
                </PartialButton>
                <PartialButton 
                    style={styles.button} 
                    variant="contained" 
                    color="secondary" 
                    onClick={onClickNewPageButton}
                >
                    {buttonTitle}
                </PartialButton>
            </div>
        </div>
    )  
}

const options = [
    'referee_key',
    'sale_key',
    'gender',
    'education' 
]

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        width: '50%',
        display: 'flex'
    },
    buttonView: {
        marginTop: 20,
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '33%',
        minWidth: 0
    }
}

export default PartialForm