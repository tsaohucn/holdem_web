import React, { PureComponent, Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from 'react-autocomplete'

export default class SearchableDropdown extends Component {

  constructor(props) {
    super(props)
  }

  onChange = (event) => {
    const text = event.target.value
    this.props.onSearch && this.props.onSearch(text)
  }

  onSelect = (item) => {
    this.props.onSearch && this.props.onSearch(item.id)
  }

  filterData = () => {
    const data = this.props.items.filter(ele => ele.id.includes(this.props.value) && (this.props.value !== ''))
    return data
  }

  render() {

    const { value, key, isSelect, label, helperText} = this.props

    const items = this.filterData()
    
    return(
      <Autocomplete
        wrapperStyle={styles.textField}
        getItemValue={item => item}
        items={items}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.id}
          </div>
        }
        onSelect={this.onSelect}
        menuStyle={styles.menuStyle}
        renderInput={(props) => <TextField 
          inputProps={{
            ...props,
            value,
            onChange: this.onChange          
          }}
          key={key}
          margin="normal"
          variant="outlined"
          select={isSelect}
          label={label}
          helperText={helperText}
          style={styles.textField}
          value={value}
          onChange={this.onChange}
        />}
      />
    )
  }
}

const styles = {
  menuStyle: {
    top: 0,
    width: '100%',
    background: '#ffffff'
  },
  textField: {
    width: '100%'
  }
}