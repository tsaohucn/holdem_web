// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
// hocs
import contentCompose from '../../hocs/contentCompose'
import withHoldemBar from '../../hocs/withHoldemBar'

import NewPage from '../../components/NewPage'
import OnlySearchPage from '../../views/OnlySearchPage'
import TablePage from '../../views/TablePage'
// tools
//import ui from '../../configs/ui'
import firebase from '../../configs/firebase'

const SearchPageComponent = (props) => 
  <OnlySearchPage
    {...props}
    title={'桌次編號'}
    leftButtonTitle='搜索' 
  />

const NewPageComponent = (props) => {
  return null
}


const TablePageComponent = (props) => {
  return null
}


const LiveScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  null,
  null,
  null,
  null,
  null
)

LiveScreen.propTypes = {
  //classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired,
};

export default withHoldemBar(withAlert((LiveScreen)))