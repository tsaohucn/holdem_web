// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local_module
// hocs
import contentCompose from '../../hocs/contentCompose'
import withHoldemBar from '../../hocs/withHoldemBar'
// components
import NewPage from '../../components/NewPage'
import SearchPage from '../../views/SearchPage'
import TablePage from '../../views/TablePage'
// tools
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

const options = [
  {
    key: 'test',
    label: 'aaaaa'
  }
]

const fetchClubOptions = () => {
  return options
}

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
   //options={fetchClubOptions()}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    data={tableData}
  />

const RefereeScreen = contentCompose(SearchPageComponent,NewPageComponent,TablePageComponent,upload)

export default withHoldemBar(withAlert(RefereeScreen))