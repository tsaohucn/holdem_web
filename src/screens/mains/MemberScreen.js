// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local_module
// hocs
import withHoldemBar from '../../hocs/withHoldemBar'
import contentCompose from '../../hocs/contentCompose'
// components
import EditPage from '../../components/EditPage'
import NewPage from '../../components/NewPage'
import SearchPage from '../../views/SearchPage'
import TablePage from '../../views/TablePage'
// tools
import ui from '../../configs/ui'
import firebase from '../../configs/firebase'

const fetchOptions = async () => {
  const clubs_snap = await firebase.database().ref('clubs').orderByChild('name').once('value')
  const referees_snap = await firebase.database().ref('referees').orderByChild('name').once('value')
  const sales_snap = await firebase.database().ref('sales').orderByChild('name').once('value')
  //
  const club_keys = Object.keys(clubs_snap.val() || {})
  const referee_keys = Object.keys(referees_snap.val() || {})
  const sales_keys = Object.keys(sales_snap.val() || {})
  //
  const clubOptions = club_keys.map(key => ({
    key,
    name: clubs_snap.val()[key]['name']
  }))
  
  const refereeOptions = referee_keys.map(key => ({
    key,
    name: referees_snap.val()[key]['name']
  }))
  
  const salesOptions = sales_keys.map(key => ({
    key,
    name: sales_snap.val()[key]['name']
  }))
  return { 
    clubOptions,
    refereeOptions,
    salesOptions
  }
}

const uploadInsertData = async (state) => {
  await firebase.database().ref('members').push(state)
  await firebase.database().ref('referees/' +  state.referee + '/memberCount').transaction(memberCount => {
    if (!memberCount) {
      return 1
    } else {
      return memberCount + 1
    }
  })
  await firebase.database().ref('sales/' +  state.sales + '/memberCount').transaction(memberCount => {
    if (!memberCount) {
      return 1
    } else {
      return memberCount + 1
    }
  })
}

const updataData = async (state) => {
  await firebase.database().ref('members').update(state)
}

const fetchTableData = async () => {
  const snap = await firebase.database().ref('members').once('value')
  const tableData = snap.val() || {}
  return { tableData }
}

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

const TablePageComponent = (props) => {
  const obj = {
    key: "edit",
    label: "編輯"
  }
  return(
    <TablePage
      {...props}
      title={ui.memberTable.concat(obj)}
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
      title={ui.memberTable.concat(obj)}
    />
  )
}

const MemberScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  EditComponent,
  uploadInsertData,
  fetchOptions,
  fetchTableData,
  updataData
)

export default withHoldemBar(withAlert(MemberScreen))