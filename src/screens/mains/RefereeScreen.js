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

const uploadInsertData = (state) => firebase.database().ref('referees').push(state)

const fetchOptions = async () => {
  const snap = await firebase.database().ref('clubs').orderByChild('name').once('value')
  const club_keys = Object.keys(snap.val())
  const options = club_keys.map(key => ({
    key,
    name: snap.val()[key]['name']
  }))
  return { clubOptions: options }
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
   //options={fetchClubOptions()}
  />

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    title={ui.refereeTable}
    data={tableData}
  />

const EditComponent = (props) => 
  <div>
    <p>{'EditComponent'}</p>
  </div>

const RefereeScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  EditComponent,
  uploadInsertData,
  fetchOptions
)

export default withHoldemBar(withAlert(RefereeScreen))