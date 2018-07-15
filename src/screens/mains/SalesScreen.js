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

const upload = (state) => firebase.database().ref('sales').push(state)

const SearchPageComponent = (props) => 
  <SearchPage
    {...props}
    title='搜索業務'
    leftButtonTitle='搜索' 
    rightButtonTitle='新增業務'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   field={ui.salesField}
   buttonTitle={'確認新增業務'}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    data={tableData}
  />

const SalesScreen = contentCompose(SearchPageComponent,NewPageComponent,TablePageComponent,upload)

export default withHoldemBar(SalesScreen)