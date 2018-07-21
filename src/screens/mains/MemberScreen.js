// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'
import contentCompose from '../../hocs/contentCompose'
import NewPage from '../../components/NewPage'
import SearchPage from '../../views/SearchPage'
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
    title='會員姓名查詢'
    leftButtonTitle='搜索' 
    rightButtonTitle='新增會員'
    showSecondSearchBar
    secondBarTitle='依裁判代號查詢'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   field={ui.memberField}
   buttonTitle={'確認新增會員'}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    data={tableData}
  />

const MemberScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  null,
  null,
  null
)

export default withHoldemBar(withAlert(MemberScreen))