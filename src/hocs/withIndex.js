// node_module
import React from 'react'
// local_module
import SearchPage from '../views/SearchPage'

function withIndex(params) {
  const {
    searchTitle,
    resource,
    leftButtonTitle,
    rightButtonTitle
  } = params ? params : {}

  return class extends React.PureComponent {

    onClickSearchPageRightButton = () => {
      this.props.history.push('/mains/' + resource + '/new')
    }

    onClickSearchPageLeftButton = () => {
      this.props.history.push('/mains/' + resource + '/table')
    }

    render() {
      return(
        <SearchPage
          {...this.props}
          title={searchTitle}
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