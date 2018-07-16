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
  id: index,
  name: 'Frozen yoghurt',
  calories: 159,
  fat: 6.0,
  carbs: 24,
  protein: '4.0'
}))

const upload = (state) => {
  return firebase.database().ref('clubs').push(state)
}

const SearchPageComponent = (props) => 
  <SearchPage
    {...props}
    title='搜索俱樂部'
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
    data={tableData}
  />

const ClubScreen = contentCompose(SearchPageComponent,NewPageComponent,TablePageComponent,upload)

export default withHoldemBar(withAlert((ClubScreen)))