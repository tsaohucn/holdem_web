// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
// hocs
import contentCompose from '../../hocs/contentCompose'
import withHoldemBar from '../../hocs/withHoldemBar'

import NewPage from '../../components/NewPage'
import ReportPage from '../../views/ReportPage'
import TablePage from '../../views/TablePage'
// tools
import ui from '../../configs/ui'
import firebase from '../../configs/firebase'

const SearchPageComponent = (props) => 
  <ReportPage
    leftButtonTitle='搜尋'
    {...props}
  />

const NewPageComponent = (props) => {
  return null
}


const TablePageComponent = (props) => {
  return null
}


const ReportScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  null,
  null,
  null,
  null,
  null,
  null
)


export default withHoldemBar(withAlert((ReportScreen)))