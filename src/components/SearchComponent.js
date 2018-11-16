// node_module
import React, { PureComponent } from 'react'
// local components
import PartialSearch from '../views/PartialSearch'

class SearchComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      radio: {
        name: true,
        referee_id: false,
      }
    }
  }

  onChangeSearchValue = (value) => {
    this.searchValue = value
  }

  onClickRadio = (event,checked) => {
    switch(event.target.value) {
    case 'name':
      this.setState({
        radio: {
          name: true,
          referee_id: false
        }
      })
      break
    case 'referee_id':
      this.setState({
        radio: {
          name: false,
          referee_id: true
        }
      })
      break
    default:
      break
    }
  }

  onClickLeftButton = () => {
    const by = this.props.showRadioBox ? Object.keys(this.state.radio).find(key => this.state.radio[key]) : 'id'
    this.props.onClickLeftButton && this.props.onClickLeftButton(by,this.searchValue)
  }

  render() {
    return(
      <PartialSearch
        {...this.props}
        radio={this.state.radio}
        onClickRadio={this.onClickRadio}
        onClickLeftButton={this.onClickLeftButton}
        onChangeSearchValue={this.onChangeSearchValue}
      />
    )
  }

}
export default SearchComponent