// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
// hocs
import contentCompose from '../../hocs/contentCompose'
import withHoldemBar from '../../hocs/withHoldemBar'
// components
import OnlySearchPage from '../../views/OnlySearchPage'
import TablePage from '../../views/TablePage'
// tools
import ui from '../../configs/ui'
import firebase from '../../configs/firebase'

const fetchTableData = async () => {
  const snap = await firebase.database().ref('live').once('value')
  const tableData = snap.val() || {}
  return { tableData }
}

const SearchPageComponent = (props) => 
  <OnlySearchPage
    {...props}
    title={'桌次編號'}
    leftButtonTitle='搜索' 
  />

const TablePageComponent = (props) => {
  return(
    <TablePage
      {...props}
      title={ui.liveTable}
    />
  )
}

const LiveScreen = contentCompose(
  SearchPageComponent,
  null,
  TablePageComponent,
  null,
  null,
  null,
  null,
  fetchTableData,
  null
)

export default withHoldemBar(withAlert((LiveScreen)))