// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local_module
// hocs
import withHoldemBar from '../../hocs/withHoldemBar'
import contentCompose from '../../hocs/contentCompose'
// components
import NewPage from '../../components/NewPage'
import EditPage from '../../components/EditPage'
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

const updataData = async (state) => {
  await firebase.database().ref('employees').update(state)
}

const fetchTableData = async () => {
  const snap = await firebase.database().ref('employees').once('value')
  const tableData = snap.val() || {}
  return { tableData }
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

const TablePageComponent = (props) => {
  const obj = {
    key: "edit",
    label: "編輯"
  }
  return(
    <TablePage
      {...props}
      title={ui.employeeTable.concat(obj)}
    />
  )
}

const EditComponent = (props) => {
  const obj = {
    key: "delete",
    label: "刪除"
  }
  return(
    <EditPage
      {...props}
      title={ui.employeeTable.concat(obj)}
    />
  )
}

const EmployeeScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  EditComponent,
  null,
  uploadInsertData,
  null,
  fetchTableData,
  updataData
)

export default withHoldemBar(withAlert(EmployeeScreen))