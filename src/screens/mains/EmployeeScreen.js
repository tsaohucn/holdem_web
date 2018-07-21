// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'
import contentCompose from '../../hocs/contentCompose'
import NewPage from '../../components/NewPage'
import ButtonSearchPage from '../../views/ButtonSearchPage'
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

const uploadInsertData = async (state) => {
  await firebase.database().ref('employees').push(state)
}

const SearchPageComponent = (props) => 
  <ButtonSearchPage
    {...props}
    leftButtonTitle='查看帳號' 
    rightButtonTitle='新增帳號'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   field={ui.employeeField}
   buttonTitle={'確認新增員工'}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    data={tableData}
  />

const EmployeeScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  null,
  uploadInsertData,
  null
)

export default withHoldemBar(withAlert(EmployeeScreen))