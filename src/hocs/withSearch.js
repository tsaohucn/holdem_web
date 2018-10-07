// node_module
import React, { PureComponent } from 'react'
// local_module
import SearchComponent from '../components/SearchComponent'

function withSearch(params) {
  const {
    searchTitle,
    resource,
    leftButtonTitle,
    rightButtonTitle,
    showRightButton,
    showSecondSearchBar,
    secondBarTitle,
    secondButtonTitle,
    wrapperComponent,
    placeholder,
    secondPlaceholder
  } = params ? params : {}

  return class extends PureComponent {

    onClickSearchPageRightButton = () => {
      this.props.history.push('/' + resource + '/new')
    }

    goToTable = (value) => {
      const {
        searchValue,
        secondSearchValue
      } = value ? value : {}
      if (resource === 'members') {
        if (!searchValue && !secondSearchValue) {
          this.props.history.push('/' + resource + '/table/$all')
        } else if (searchValue) {
          this.props.history.push('/' + resource + '/table/memberName/' + searchValue)
        } else if (secondSearchValue) {
          this.props.history.push('/' + resource + '/table/refereeId/' + secondSearchValue)
        }     
      } else {
        if (!searchValue && !secondSearchValue) {
          this.props.history.push('/' + resource + '/table/$all')
        } else {
          this.props.history.push('/' + resource + '/table/' + searchValue)
        }
      }
    }

    render() {
      const Component = wrapperComponent ? wrapperComponent : SearchComponent
      return(
        <Component
          {...this.props}
          title={searchTitle}
          placeholder={placeholder}
          secondPlaceholder={secondPlaceholder}
          showRightButton={showRightButton}
          showSecondSearchBar={showSecondSearchBar}
          secondBarTitle={secondBarTitle}
          secondButtonTitle={secondButtonTitle}
          leftButtonTitle={leftButtonTitle || defaultLeftButtonTitle}
          rightButtonTitle={rightButtonTitle || defaultRightButtonTitle}
          onClickSearchPageRightButton={this.onClickSearchPageRightButton}
          onClickSearchPageLeftButton={this.goToTable}
        />
      )
    }
  }
}

const defaultLeftButtonTitle = '搜索'
const defaultRightButtonTitle = '新增'

export default withSearch