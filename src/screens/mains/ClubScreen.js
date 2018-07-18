// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
// hocs
import contentCompose from '../../hocs/contentCompose'
import withHoldemBar from '../../hocs/withHoldemBar'

import NewPage from '../../components/NewPage'
import SearchPage from '../../views/SearchPage'
import TablePage from '../../views/TablePage'
// tools
import ui from '../../configs/ui'
import firebase from '../../configs/firebase'

const tableData = Array(500).fill().map((e,index) => ({
  name: 'Frozen yoghurt',
  account: 159,
  password: 6.0
}))

const uploadInsertData = (state) => {
  return firebase.database().ref('clubs').push(state)
}

const SearchPageComponent = (props) => 
  <SearchPage
    {...props}
    title={'俱樂部查詢'}
    leftButtonTitle='搜索' 
    rightButtonTitle='新增俱樂部'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   field={ui.clubField}
   buttonTitle={'確認新增俱樂部'}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    title={ui.clubTable}
    data={tableData}
  />

const ClubScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  null,
  uploadInsertData,
  null
)

export default withHoldemBar(withAlert((ClubScreen)))