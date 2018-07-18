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

const uploadInsertData = (state) => firebase.database().ref('sales').push(state)

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

const TablePageComponent = (props) => 
  <TablePage
    {...props}
    title={ui.salesTable}
    data={tableData}
  />

const EditComponent = (props) => 
  <div>
    <p>{'EditComponent'}</p>
  </div>

const SalesScreen = contentCompose(
  SearchPageComponent,
  NewPageComponent,
  TablePageComponent,
  EditComponent,
  uploadInsertData,
  fetchOptions
)

export default withHoldemBar(withAlert(SalesScreen))