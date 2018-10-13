// node_module
import React, { Component } from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// local components
import PartialButton from './PartialButton'

const ReportPage = (props) => {

    const { 
        buttonTitle,
        onClickButton,
        onClickRadio,
        radio,
        onChangeMemberText,
        onChangeRefereeText,
        onChangeSaleText,
        onChangeStartDate,
        onChangeEndDate
    } = props ? props : {}
    
    return(
        <div>
            <br/>
            <div style={styles.dateView}>
                <p>{'查詢日期從 : '}</p>
                <form noValidate>
                    <TextField
                        style={styles.date}
                        id="date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={onChangeStartDate}
                    />
                </form>
                <p>{'至'}</p>
                <form noValidate>
                    <TextField
                        style={styles.date}
                        id="date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={onChangeEndDate}
                    />
                </form>
            </div>
            <FormControl component="fieldset">
                <FormGroup>
                    <div>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={radio['member']}
                                    onChange={onClickRadio}
                                    value="member"
                                />
                            }
                            label="會員代號"
                        />
                        <TextField
                            style={styles.textField}
                            id="margin-none"
                            onChange={onChangeMemberText}
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={radio['referee']}
                                    onChange={onClickRadio}
                                    value="referee"
                                />
                            }
                            label="裁判代號"
                        />
                        <TextField
                            style={styles.textField}
                            id="margin-none"
                            onChange={onChangeRefereeText}
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={radio['sale']}
                                    onChange={onClickRadio}
                                    value="sale"
                                />
                            }
                            label="業務代號"
                        />
                        <TextField
                            style={styles.textField}
                            id="margin-none"
                            onChange={onChangeSaleText}
                        />
                    </div>
                </FormGroup>
            </FormControl>
            <br/>
            <div style={styles.buttonView}>
                <PartialButton onClick={onClickButton}>{buttonTitle}</PartialButton>
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
    },
    button: {
        width: '30%'
    },
    dateView: {
        display: 'flex',
        flexDirection: 'row'
    },
    date: {
        width: 100,
        marginLeft: 5, 
        marginRight: 5
    },
    textField: {
        width: 100
    }
}

export default ReportPage