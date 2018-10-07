// node_module
import React, { PureComponent } from 'react'
// local components
import PartialSearch from '../views/PartialSearch'

class SearchComponent extends PureComponent {

  onChangeSearchValue = (value) => {
    this.searchValue = value
  }

  onChangeSecondSearchValue = (value) => {
    this.secondSearchValue = value
  }

  onClickSearchPageLeftButton = () => {
    const value = {
      searchValue: this.searchValue,
      secondSearchValue: this.secondSearchValue
    }
    this.props.onClickSearchPageLeftButton && this.props.onClickSearchPageLeftButton(value)
  }

  render() {
    return(
      <PartialSearch
        {...this.props}
        onClickSearchPageLeftButton={this.onClickSearchPageLeftButton}
        onClickSecondSearchButton={this.onClickSecondSearchButton}
        onChangeSearchValue={this.onChangeSearchValue}
        onChangeSecondSearchValue={this.onChangeSecondSearchValue}
      />
    )
  }

}
export default SearchComponent