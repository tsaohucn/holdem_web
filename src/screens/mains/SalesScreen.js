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
  await firebase.database().ref('sales').push(Object.assign(state,obj))
}

const updataData = async (state) => {
  await firebase.database().ref('sales').update(state)
}

const fetchOptions = async () => {
  const snap = await firebase.database().ref('clubs').orderByChild('name').once('value')
  const club_keys = Object.keys(snap.val() || {})
  const options = club_keys.map(key => ({
    key,
    name: snap.val()[key]['name']
  }))
  return { clubOptions: options }
}

const fetchTableData = async () => {
  const snap = await firebase.database().ref('sales').once('value')
  const tableData = snap.val() || {}
  return { tableData }
}

const fetchMemberData = async (id) => {
  const snap = await firebase.database().ref('members').orderByChild('sales').equalTo(id).once('value')
  const memberData = snap.val() || {}
  return { memberData }
}

const SearchPageComponent = (props) => 
  <SearchPage
    {...props}
    title='業務代號查詢'
    leftButtonTitle='搜索' 
    rightButtonTitle='新增業務'
  />

const NewPageComponent = (props) =>
  <NewPage
   {...props}
   field={ui.salesField}
   buttonTitle={'確認新增業務'}
  />

const TablePageComponent = (props) => {
  const obj = {
    key: "edit",
    label: "編輯"
  }
  return(
    <TablePage
      {...props}
      title={ui.salesTable.concat(obj)}
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
      title={ui.salesTable.concat(obj)}
    />
  )
}

const MemberComponent = (props) => {
  return(
    <TablePage
      {...props}
      title={ui.member}
      isMemberTable
    />
  )  
}

const SalesScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  EditComponent,
  MemberComponent,
  uploadInsertData,
  fetchOptions,
  fetchTableData,
  updataData,
  fetchMemberData
)

export default withHoldemBar(withAlert(SalesScreen))