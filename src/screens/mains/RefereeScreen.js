// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local_module
// hocs
import contentCompose from '../../hocs/contentCompose'
import withHoldemBar from '../../hocs/withHoldemBar'
// components
import NewPage from '../../components/NewPage'
import EditPage from '../../components/EditPage'
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

const uploadInsertData = async (state) => {
  const snap = await firebase.database().ref('clubs/' + state.club + '/name').once('value')
  const obj = {
    clubName: snap.val(),
    memberCount: 10,
  }
  await firebase.database().ref('referees').push(Object.assign(state,obj))
}

const fetchOptions = async () => {
  const snap = await firebase.database().ref('clubs').orderByChild('name').once('value')
  const club_keys = Object.keys(snap.val())
  const options = club_keys.map(key => ({
    key,
    name: snap.val()[key]['name']
  }))
  return { clubOptions: options }
}

const fetchTableData = async () => {
  const snap = await firebase.database().ref('referees').once('value')
  const tableData = Object.values(snap.val())
  return { tableData }
}

const SearchPageComponent = (props) => 
  <SearchPage
    {...props}
    title={'裁判代號查詢'}
    leftButtonTitle='搜索' 
    rightButtonTitle='新增裁判'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   field={ui.refereeField}
   buttonTitle={'確認新增裁判'}
  />

const TablePageComponent = (props) => {
  const obj = {
    key: "edit",
    label: "編輯"
  }
  return(
    <TablePage
      {...props}
      title={ui.refereeTable.concat(obj)}
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
      title={ui.refereeTable.concat(obj)}
    />
  )
}

const RefereeScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  EditComponent,
  uploadInsertData,
  fetchOptions,
  fetchTableData
)

export default withHoldemBar(withAlert(RefereeScreen))