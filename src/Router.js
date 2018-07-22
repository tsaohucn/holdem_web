// node module
import React from 'react'
import { BrowserRouter , Route, Switch } from 'react-router-dom'
// local components
// auths
import SessionScreen from './screens/SessionScreen'
import WelcomeScreen from './screens/WelcomeScreen'
// mains
// clubs
import IndexScreen from './screens/mains/IndexScreen'
import ClubIndexScreen from './screens/mains/clubs/ClubIndexScreen'
import ClubNewScreen from './screens/mains/clubs/ClubNewScreen'
import ClubTableScreen  from './screens/mains/clubs/ClubTableScreen'
// referees
import RefereeIndexScreen from './screens/mains/referees/RefereeIndexScreen'
import RefereeNewScreen from './screens/mains/referees/RefereeNewScreen'
import RefereeTableScreen from './screens/mains/referees/RefereeTableScreen'
import RefereeEditScreen from './screens/mains/referees/RefereeEditScreen'
import RefereeMemberScreen from './screens/mains/referees/RefereeMemberScreen'
// sales
import SalesIndexScreen from './screens/mains/sales/SalesIndexScreen'
import SalesNewScreen from './screens/mains/sales/SalesNewScreen'
import SalesTableScreen from './screens/mains/sales/SalesTableScreen'
import SalesEditScreen from './screens/mains/sales/SalesEditScreen'
import SalesMemberScreen from './screens/mains/sales/SalesMemberScreen'
// members
import MemberIndexScreen from './screens/mains/members/MemberIndexScreen'
import MemberNewScreen from './screens/mains/members/MemberNewScreen'
import MemberTableScreen from './screens/mains/members/MemberTableScreen'
import MemberEditScreen from './screens/mains/members/MemberEditScreen'
// employees
import EmployeeIndexScreen from './screens/mains/employees/EmployeeIndexScreen'
import EmployeeNewScreen from './screens/mains/employees/EmployeeNewScreen'
import EmployeeTableScreen from './screens/mains/employees/EmployeeTableScreen'
import EmployeeEditScreen from './screens/mains/employees/EmployeeEditScreen'
// reports
import ReportIndexScreen from './screens/mains/reports/ReportIndexScreen'
// tables
import TableIndexScreen from './screens/mains/tables/TableIndexScreen'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={SessionScreen}/>
      <Route path='/welcomes' component={WelcomeScreen}/>
      <Route path='/mains/index' component={IndexScreen}/>
      {/*clubs*/}
      <Route path='/mains/clubs/index' component={ClubIndexScreen}/>
      <Route path='/mains/clubs/new' component={ClubNewScreen}/>
      <Route path='/mains/clubs/table' component={ClubTableScreen}/>
      {/*referees*/}
      <Route path='/mains/referees/index' component={RefereeIndexScreen}/>
      <Route path='/mains/referees/new' component={RefereeNewScreen}/>
      <Route path='/mains/referees/table' component={RefereeTableScreen}/>
      <Route path='/mains/referees/edit' component={RefereeEditScreen}/>
      <Route path='/mains/referees/member/:id' component={RefereeMemberScreen}/>
      {/*sales*/}
      <Route path='/mains/sales/index' component={SalesIndexScreen}/>
      <Route path='/mains/sales/new' component={SalesNewScreen}/>
      <Route path='/mains/sales/table' component={SalesTableScreen}/>
      <Route path='/mains/sales/edit' component={SalesEditScreen}/>
      <Route path='/mains/sales/member/:id' component={SalesMemberScreen}/>
      {/*members*/}
      <Route path='/mains/members/index' component={MemberIndexScreen}/>
      <Route path='/mains/members/new' component={MemberNewScreen}/>
      <Route path='/mains/members/table' component={MemberTableScreen}/>
      <Route path='/mains/members/edit' component={MemberEditScreen}/>
      {/*employees*/}
      <Route path='/mains/employees/index' component={EmployeeIndexScreen}/>
      <Route path='/mains/employees/new' component={EmployeeNewScreen}/>
      <Route path='/mains/employees/table' component={EmployeeTableScreen}/>
      <Route path='/mains/employees/edit' component={EmployeeEditScreen}/>
      {/*reports*/}
      <Route path='/mains/reports/index' component={ReportIndexScreen}/>
      {/*tables*/}
      <Route path='/mains/tables/index' component={TableIndexScreen}/>
    </Switch>
  </BrowserRouter>
)

export default Router