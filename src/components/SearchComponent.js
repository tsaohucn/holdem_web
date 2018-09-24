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
    this.props.onClickSearchPageLeftButton && this.props.onClickSearchPageLeftButton(this.searchValue || '$all')
  }

  onClickSecondSearchButton = () => {
    this.props.onClickSecondSearchButton && this.props.onClickSecondSearchButton(this.secondSearchValue || '$all')
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