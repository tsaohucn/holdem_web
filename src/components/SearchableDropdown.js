import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from 'react-autocomplete'

export default class SearchableDropdown extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  onChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  onSelect = (val) => {
    console.log(val)
  }

  render() {

    const { key, isSelect, label, helperText} = this.props

    return(
      <Autocomplete
        getItemValue={(item) => item.label == 'apple'}
        items={[
          { label: 'apple' },
          { label: 'banana' },
          { label: 'pear' }
        ]}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.label}
          </div>
        }
        onSelect={this.onSelect}
        renderInput={(props) => <TextField 
          inputProps={{
            ...props,
            value: this.state.text,
            onChange: this.onChange          
          }}
          key={key}
          margin="normal"
          variant="outlined"
          select={isSelect}
          label={label}
          helperText={helperText}
          style={styles.textField}
          value={this.state.text}
          onChange={this.onChange}
        />}
      />
    )
  }
}


const styles = {
  textField: {
    width: '50%',
    display: 'flex'
  }
}