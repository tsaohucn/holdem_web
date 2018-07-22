// node_module
import React from 'react'
// local_module
import SearchComponent from '../components/SearchComponent'

function withIndex(params) {
  const {
    searchTitle,
    resource,
    leftButtonTitle,
    rightButtonTitle,
    showSecondSearchBar,
    secondBarTitle,
    secondButtonTitle,
    wrapperComponent
  } = params ? params : {}

  return class extends React.PureComponent {

    onClickSearchPageRightButton = () => {
      this.props.history.push('/mains/' + resource + '/new')
    }

    onClickSearchPageLeftButton = () => {
      this.props.history.push('/mains/' + resource + '/table')
    }

    render() {
      const Component = wrapperComponent ? wrapperComponent : SearchComponent
      return(
        <Component
          {...this.props}
          title={searchTitle}
          showSecondSearchBar={showSecondSearchBar}
          secondBarTitle={secondBarTitle}
          secondButtonTitle={secondButtonTitle}
          leftButtonTitle={leftButtonTitle || defaultLeftButtonTitle}
          rightButtonTitle={rightButtonTitle || defaultRightButtonTitle}
          onClickSearchPageRightButton={this.onClickSearchPageRightButton}
          onClickSearchPageLeftButton={this.onClickSearchPageLeftButton}
        />
      )
    }
  }
}

const defaultLeftButtonTitle = '搜索'
const defaultRightButtonTitle = '新增'

export default withIndex