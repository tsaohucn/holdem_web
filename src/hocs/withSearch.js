// node_module
import React from 'react'
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

  return class extends React.PureComponent {

    onClickSearchPageRightButton = () => {
      this.props.history.push('/' + resource + '/new')
    }

    goToTable = (search) => {
      this.props.history.push('/' + resource + '/table/' + search )
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
          onClickSecondSearchButton={this.goToTable}
        />
      )
    }
  }
}

const defaultLeftButtonTitle = '搜索'
const defaultRightButtonTitle = '新增'

export default withSearch