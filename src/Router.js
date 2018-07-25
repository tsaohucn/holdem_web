// node module
import React from 'react'
import { BrowserRouter , Route, Switch } from 'react-router-dom'
// local components
// auths
import WelcomeScreen from './screens/WelcomeScreen'
import NoMatchScreen from './screens/NoMatchScreen'
import SessionScreen from './screens/SessionScreen'
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

const Router = ({auth}) => {
  switch(auth) {
    case 'init':
      return <Init/>
      break
    case true:
      return <Auth/>
      break
    case false:
      return <NoAuth/>
      break
    default:
      return null
  }
}

const Init = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={SessionScreen}/>
    </Switch>
  </BrowserRouter>
)

const NoAuth = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/index' component={WelcomeScreen}/>
      <Route path='/' component={NoMatchScreen}/>
    </Switch>
  </BrowserRouter>
)

const Auth = () => (
  <BrowserRouter>
    <Switch>
      {/*clubs*/}
      <Route exact path='/index' component={IndexScreen}/>
      <Route exact path='/clubs/index' component={ClubIndexScreen}/>
      <Route exact path='/clubs/new' component={ClubNewScreen}/>
      <Route exact path='/clubs/table/:id' component={ClubTableScreen}/>
      {/*referees*/}
      <Route exact path='/referees/index' component={RefereeIndexScreen}/>
      <Route exact path='/referees/new' component={RefereeNewScreen}/>
      <Route exact path='/referees/table/:id' component={RefereeTableScreen}/>
      <Route exact path='/referees/edit/:id' component={RefereeEditScreen}/>
      <Route exact path='/referees/member/:id' component={RefereeMemberScreen}/>
      {/*sales*/}
      <Route exact path='/sales/index' component={SalesIndexScreen}/>
      <Route exact path='/sales/new' component={SalesNewScreen}/>
      <Route exact path='/sales/table/:id' component={SalesTableScreen}/>
      <Route exact path='/sales/edit/:id' component={SalesEditScreen}/>
      <Route exact path='/sales/member/:id' component={SalesMemberScreen}/>
      {/*members*/}
      <Route exact path='/members/index' component={MemberIndexScreen}/>
      <Route exact path='/members/new' component={MemberNewScreen}/>
      <Route exact path='/members/table/:id' component={MemberTableScreen}/>
      <Route exact path='/members/edit/:id' component={MemberEditScreen}/>
      {/*employees*/}
      <Route exact path='/employees/index' component={EmployeeIndexScreen}/>
      <Route exact path='/employees/new' component={EmployeeNewScreen}/>
      <Route exact path='/employees/table/:id' component={EmployeeTableScreen}/>
      <Route exact path='/employees/edit/:id' component={EmployeeEditScreen}/>
      {/*reports*/}
      <Route exact path='/reports/index' component={ReportIndexScreen}/>
      {/*tables*/}
      <Route exact path='/tables/index' component={TableIndexScreen}/>
      <Route path='/' component={NoMatchScreen}/>
    </Switch>
  </BrowserRouter>
)

export default Router