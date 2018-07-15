// node_module
import React from 'react'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'
import contentCompose from '../../hocs/contentCompose'
import NewPage from '../../components/NewPage'
import SearchPage from '../../views/SearchPage'
import TablePage from '../../views/TablePage'
import ui from '../../configs/ui'
import firebase from '../../configs/firebase'

const tableData = [
  {
    id: '1',
    name: 'Frozen yoghurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: '4.0'
  }
]

const upload = (state) => firebase.database().ref('referees').push(state)

const SearchPageComponent = (props) => 
  <SearchPage
    {...props}
    title='搜索裁判'
    leftButtonTitle='搜索' 
    rightButtonTitle='新增裁判'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   field={ui.refereeField}
   buttonTitle={'確認新增裁判'}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    data={tableData}
  />

const RefereeScreen = contentCompose(SearchPageComponent,NewPageComponent,TablePageComponent,upload)

export default withHoldemBar(RefereeScreen)