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
    wrapperComponent,
    placeholder,
    showRadioBox,
    radioOneTitle,
    radioTwoTitle
  } = params ? params : {}

  return class extends PureComponent {

    onClickSearchPageRightButton = () => {
      this.props.history.push('/' + resource + '/new')
    }

    goToTable = (by,searchValue) => {
      if (!searchValue) {
        this.props.history.push('/' + resource + '/table')
      } else {
        this.props.history.push('/' + resource + '/table/' + by + '/' + searchValue)
      }
    }

    render() {
      const Component = wrapperComponent ? wrapperComponent : SearchComponent
      return(
        <Component
          {...this.props}
          title={searchTitle}
          placeholder={placeholder}
          showRightButton={showRightButton}
          leftButtonTitle={leftButtonTitle || defaultLeftButtonTitle}
          rightButtonTitle={rightButtonTitle || defaultRightButtonTitle}
          showRadioBox={showRadioBox}
          radioOneTitle={radioOneTitle}
          radioTwoTitle={radioTwoTitle}
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