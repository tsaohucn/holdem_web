// node module
import React from 'react'
import { BrowserRouter , Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
// local components
// auths
import WelcomeScreen from './screens/WelcomeScreen'
import NoMatchScreen from './screens/NoMatchScreen'
import SessionScreen from './screens/SessionScreen'
import NoAuthScreen from './screens/NoAuthScreen'
// mains
// index
import IndexScreen from './screens/mains/IndexScreen'
// printers
import PrinterTableScreen from './screens/mains/printers/PrinterTableScreen'
// informations
import InformationScreen from './screens/mains/InformationScreen'
// clubs
import ClubIndexScreen from './screens/mains/clubs/ClubIndexScreen'
import ClubNewScreen from './screens/mains/clubs/ClubNewScreen'
import ClubTableScreen  from './screens/mains/clubs/ClubTableScreen'
import ClubEditScreen from './screens/mains/clubs/ClubEditScreen'
// employees
import EmployeeIndexScreen from './screens/mains/employees/EmployeeIndexScreen'
import EmployeeNewScreen from './screens/mains/employees/EmployeeNewScreen'
import EmployeeTableScreen from './screens/mains/employees/EmployeeTableScreen'
import EmployeeSimpleTableScreen from './screens/mains/employees/EmployeeSimpleTableScreen'
import EmployeeEditScreen from './screens/mains/employees/EmployeeEditScreen'
// referees
import RefereeIndexScreen from './screens/mains/referees/RefereeIndexScreen'
import RefereeNewScreen from './screens/mains/referees/RefereeNewScreen'
import RefereeTableScreen from './screens/mains/referees/RefereeTableScreen'
import RefereeSimpleTableScreen from './screens/mains/referees/RefereeSimpleTableScreen'
import RefereeEditScreen from './screens/mains/referees/RefereeEditScreen'
// sales
import SaleIndexScreen from './screens/mains/sales/SaleIndexScreen'
import SaleNewScreen from './screens/mains/sales/SaleNewScreen'
import SaleTableScreen from './screens/mains/sales/SaleTableScreen'
import SaleSimpleTableScreen from './screens/mains/sales/SaleSimpleTableScreen'
import SaleEditScreen from './screens/mains/sales/SaleEditScreen'
// members
import MemberIndexScreen from './screens/mains/members/MemberIndexScreen'
import MemberNewScreen from './screens/mains/members/MemberNewScreen'
import MemberTableScreen from './screens/mains/members/MemberTableScreen'
import MemberSimpleTableScreen from './screens/mains/members/MemberSimpleTableScreen'
import MemberEditScreen from './screens/mains/members/MemberEditScreen'
// games
import PlayerIndexScreen from './screens/mains/players/PlayerIndexScreen'
import PlayerTableScreen from './screens/mains/players/PlayerTableScreen'
// reports
import ReportIndexScreen from './screens/mains/reports/ReportIndexScreen'
import MemberReportScreen from './screens/mains/reports/MemberReportScreen'
import RefereeReportScreen from './screens/mains/reports/RefereeReportScreen'
import RefereeDayReportScreen from './screens/mains/reports/RefereeDayReportScreen'
import SaleReportScreen from './screens/mains/reports/SaleReportScreen'
import TableReportScreen from './screens/mains/reports/TableReportScreen'

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
      <Route exact path='/' component={WelcomeScreen}/>
      <Route path='/' component={NoMatchScreen}/>
    </Switch>
  </BrowserRouter>
)

const AuthAdmins = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={IndexScreen}/>
      {/*infomation*/}
      <Route exact path='/informations' component={InformationScreen}/>
      {/*clubs*/}
      <Route exact path='/clubs' component={ClubIndexScreen}/>
      <Route exact path='/clubs/new' component={ClubNewScreen}/>
      <Route exact path='/clubs/table' component={ClubTableScreen}/>
      <Route exact path='/clubs/table/:by/:searchValue' component={ClubTableScreen}/>
      <Route exact path='/clubs/edit/:key' component={ClubEditScreen}/>
      {/*employees*/}
      <Route exact path='/employees/simpleTable/:by/:searchValue' component={EmployeeSimpleTableScreen}/>
      {/*referees*/}
      <Route exact path='/referees/simpleTable/:by/:searchValue' component={RefereeSimpleTableScreen}/>
      {/*sales*/}
      <Route exact path='/sales/simpleTable/:by/:searchValue' component={SaleSimpleTableScreen}/>
      {/*members*/}
      <Route exact path='/members/simpleTable/:by/:searchValue' component={MemberSimpleTableScreen}/>
      {/*nomatch*/}
      <Route path='/' component={NoMatchScreen}/>
    </Switch>
  </BrowserRouter>
)

const AuthClubs = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={IndexScreen}/>
      <Route exact path='/informations' component={InformationScreen}/>
      {/*employees*/}
      <Route exact path='/employees' component={EmployeeIndexScreen}/>
      <Route exact path='/employees/new' component={EmployeeNewScreen}/>
      <Route exact path='/employees/table' component={EmployeeTableScreen}/>
      <Route exact path='/employees/table/:by/:searchValue' component={EmployeeTableScreen}/>
      <Route exact path='/employees/edit/:key' component={EmployeeEditScreen}/>
      <Route path='/' component={NoMatchScreen}/>
    </Switch>
  </BrowserRouter>
)

const AuthEmployees = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={IndexScreen}/>
      <Route exact path='/informations' component={InformationScreen}/>
      {/*referees*/}
      <Route exact path='/referees' component={RefereeIndexScreen}/>
      <Route exact path='/referees/new' component={RefereeNewScreen}/>
      <Route exact path='/referees/table' component={RefereeTableScreen}/>
      <Route exact path='/referees/table/:by/:searchValue' component={RefereeTableScreen}/>
      <Route exact path='/referees/edit/:key' component={RefereeEditScreen}/>
      {/*sales*/}
      <Route exact path='/sales' component={SaleIndexScreen}/>
      <Route exact path='/sales/new' component={SaleNewScreen}/>
      <Route exact path='/sales/table' component={SaleTableScreen}/>
      <Route exact path='/sales/table/:by/:searchValue' component={SaleTableScreen}/>
      <Route exact path='/sales/edit/:key' component={SaleEditScreen}/>
      {/*members*/}
      <Route exact path='/members' component={MemberIndexScreen}/>
      <Route exact path='/members/new' component={MemberNewScreen}/>
      <Route exact path='/members/table' component={MemberTableScreen}/>
      <Route exact path='/members/table/:by/:searchValue' component={MemberTableScreen}/>
      <Route exact path='/members/simpleTable/:by/:searchValue' component={MemberSimpleTableScreen}/>
      <Route exact path='/members/edit/:key' component={MemberEditScreen}/>
      {/*games*/}
      <Route exact path='/players' component={PlayerIndexScreen}/>
      <Route exact path='/players/table' component={PlayerTableScreen}/>
      <Route exact path='/players/table/:by/:searchValue' component={PlayerTableScreen}/>
      {/*reports*/}
      <Route exact path='/reports' component={ReportIndexScreen}/>
      <Route exact path='/reports/member/:startDate/:endDate/:searchValue' component={MemberReportScreen}/>
      <Route exact path='/reports/referee/:startDate/:endDate/:searchValue' component={RefereeReportScreen}/>
      <Route exact path='/reports/refereeDay/:date/:searchValue' component={RefereeDayReportScreen}/>
      <Route exact path='/reports/sale/:startDate/:endDate/:searchValue' component={SaleReportScreen}/>
      <Route exact path='/reports/table/:date/:searchValue' component={TableReportScreen}/>
      {/*nomatch*/}
      <Route exact path='/printers' component={PrinterTableScreen}/>
      <Route path='/' component={NoMatchScreen}/>
    </Switch>
  </BrowserRouter>
)

const AuthOnlyReport = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/index' component={IndexScreen}/>
      {/*clubs*/}
      <Route exact path='/clubs/index' component={NoAuthScreen}/>
      {/*referees*/}
      <Route exact path='/referees/index' component={NoAuthScreen}/>
      {/*sales*/}
      <Route exact path='/sales/index' component={NoAuthScreen}/>
      {/*members*/}
      <Route exact path='/members/index' component={NoAuthScreen}/>
      {/*employees*/}
      <Route exact path='/employees/index' component={NoAuthScreen}/>
      {/*reports*/}
      <Route exact path='/reports/index' component={ReportIndexScreen}/>
      {/*tables*/}
      <Route exact path='/tables/index' component={NoAuthScreen}/>
      {/*nomatch*/}
      <Route path='/' component={NoMatchScreen}/>
    </Switch>
  </BrowserRouter>
)

const Router = inject('HoldemStore')(observer(({HoldemStore}) => {
  switch(HoldemStore.isAuth) {
  case 'check':
    return <Init/>
  case true:
    switch(HoldemStore.resource) {
    case 'admins':
      return <AuthAdmins/>
    case 'clubs':
      return <AuthClubs/>
    case 'employees':
      return <AuthEmployees/>
    case 'referees':
      return <AuthOnlyReport/>
    case 'sales' :
      return <AuthOnlyReport/>
    default:
      return <h1>Error</h1>
    }
  case false:
    return <NoAuth/>
  default:
    return <h1>Error</h1>
  }
}))

export default Router