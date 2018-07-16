// node module
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import sleep from '../helpers/sleep'
// local components
function contentCompose(SearchComponent,NewComponent,TableComponent,upload) {
  return class extends React.Component {
  	constructor(props) {
  	  super(props)
      this.state = {
        isLoading: false,
        loadingState: null,
        page: 'search'
      }
  	}

    searchTable = () => {
      // do something then 
      this.goToTableComponent()    
    }

    addNewData = (state) => {
      this.setState({
        isLoading: true,
        loadingState: '上傳資料中'
      },async function () {
        try {
          await sleep(1000)
          await upload && upload(state)
          this.props.alert.show('上傳成功')
        } catch(err) {
          this.props.alert.show('上傳失敗 : ' + err.toString())
        } finally {
          this.setState({
            isLoading: false,
            loadingState: null               
          },this.goToSearchComponent)
        }
      })
    }

    goToSearchComponent = () => {
      this.setState({
        page: 'search'
      })       
    }

    goToNewComponent = () => {
      this.setState({
        page: 'new'
      })
    }

    goToTableComponent = () => {
      this.setState({
        page: 'table'
      })       
    }

    renderSubComponent() {
      if (this.state.page === 'search') {
        return SearchComponent
      } else if (this.state.page === 'new') {
        return NewComponent
      } else if (this.state.page === 'table') {
        return TableComponent
      } else {
        return null
      }
    }

    render() {

      const SubComponent = this.renderSubComponent()

      return(
        <div 
          style={styles.container} 
          {...this.props}
        >
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <CircularProgress size={50}/>
              <h3>{this.state.loadingState}</h3>
            </div>
            :
            <SubComponent
              {...this.props}
              onClickSearchPageLeftButton={this.searchTable}
              onClickSearchPageRightButton={this.goToNewComponent}
              onClickNewPageButton={this.addNewData}
              onClickTablePageButton={this.goToSearchComponent}
            />
          }
        </div>
      )
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default contentCompose