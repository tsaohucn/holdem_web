// node_module
import React from 'react'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'
import contentCompose from '../../hocs/contentCompose'
import SearchPage from '../../views/SearchPage'
import NewPage from '../../views/NewPage'
import TablePage from '../../views/TablePage'
import ui from '../../configs/ui'

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

const SearchPageComponent = (props) => 
  <SearchPage
    {...props}
    title="搜索業務"
    buttonLeftTitle='搜索' 
    buttonRightTitle='新增業務'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   data={ui.salesField}
   buttonTitle={'確認新增業務'}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    data={tableData}
  />

const SalesScreen = contentCompose(SearchPageComponent,NewPageComponent,TablePageComponent)

export default withHoldemBar(SalesScreen)