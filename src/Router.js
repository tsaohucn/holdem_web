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
import RefereeIdScreen from './screens/mains/referees/RefereeIdScreen'
import RefereeMemberScreen from './screens/mains/referees/RefereeMemberScreen'
import RefereeAccountScreen from './screens/mains/referees/RefereeAccountScreen'
import RefereePasswordScreen from './screens/mains/referees/RefereePasswordScreen'
// sales
import SaleIndexScreen from './screens/mains/sales/SaleIndexScreen'
import SaleNewScreen from './screens/mains/sales/SaleNewScreen'
import SaleTableScreen from './screens/mains/sales/SaleTableScreen'
import SaleEditScreen from './screens/mains/sales/SaleEditScreen'
import SaleIdScreen from './screens/mains/sales/SaleIdScreen'
import SaleMemberScreen from './screens/mains/sales/SaleMemberScreen'
import SaleAccountScreen from './screens/mains/sales/SaleAccountScreen'
import SalePasswordScreen from './screens/mains/sales/SalePasswordScreen'
// members
import MemberIndexScreen from './screens/mains/members/MemberIndexScreen'
import MemberNewScreen from './screens/mains/members/MemberNewScreen'
import MemberTableScreen from './screens/mains/members/MemberTableScreen'
import MemberTableByMemmberNameScreen from './screens/mains/members/MemberTableByMemmberNameScreen'
import MemberTableByRefereeIdScreen from './screens/mains/members/MemberTableByRefereeIdScreen'
import MemberEditScreen from './screens/mains/members/MemberEditScreen'
import MemberIdScreen from './screens/mains/members/MemberIdScreen'
// employees
import EmployeeIndexScreen from './screens/mains/employees/EmployeeIndexScreen'
import EmployeeNewScreen from './screens/mains/employees/EmployeeNewScreen'
import EmployeeTableScreen from './screens/mains/employees/EmployeeTableScreen'
import EmployeeEditScreen from './screens/mains/employees/EmployeeEditScreen'
import EmployeeIdScreen from './screens/mains/employees/EmployeeIdScreen'
import EmployeeAccountScreen from './screens/mains/employees/EmployeeAccountScreen'
import EmployeePasswordScreen from './screens/mains/employees/EmployeePasswordScreen'
// reports
import ReportIndexScreen from './screens/mains/reports/ReportIndexScreen'
import MemberReportScreen from './screens/mains/reports/MemberReportScreen'
import RefereeReportScreen from './screens/mains/reports/RefereeReportScreen'
import RefereeDayReportScreen from './screens/mains/reports/RefereeDayReportScreen'
import SaleReportScreen from './screens/mains/reports/SaleReportScreen'
// tables
import TableIndexScreen from './screens/mains/tables/TableIndexScreen'
import TableTableScreen from './screens/mains/tables/TableTableScreen'

const Router = inject('HoldemStore')(observer(({HoldemStore}) => {
  switch(HoldemStore.isAuth) {
    case 'check':
      return <Init/>
      break
    case true:
      switch(HoldemStore.resource) {
        case 'admin':
          return <AuthAdmin/>
          break
        case 'employees':
          return <AuthAdmin/>
          break
        case 'referees':
          return <AuthOnlyReport/>
          break
        case 'sales' :
          return <AuthOnlyReport/>
          break
        default:
          return <h1>Error</h1>
          break
      }
      break
    case false:
      return <NoAuth/>
      break
    default:
      return <h1>Error</h1>
      break
  }
}))

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

const AuthAdmin = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/index' component={IndexScreen}/>
      {/*clubs*/}
      <Route exact path='/clubs/index' component={ClubIndexScreen}/>
      <Route exact path='/clubs/new' component={ClubNewScreen}/>
      <Route exact path='/clubs/table/:search' component={ClubTableScreen}/>
      {/*referees*/}
      <Route exact path='/referees/index' component={RefereeIndexScreen}/>
      <Route exact path='/referees/new' component={RefereeNewScreen}/>
      <Route exact path='/referees/table/:search' component={RefereeTableScreen}/>
      <Route exact path='/referees/member/:search' component={RefereeMemberScreen}/>
      <Route exact path='/referees/edit/:search' component={RefereeEditScreen}/>
      <Route exact path='/referees/id/:id' component={RefereeIdScreen}/>
      <Route exact path='/referees/account/:id' component={RefereeAccountScreen}/>
      <Route exact path='/referees/password/:id' component={RefereePasswordScreen}/>
      {/*sales*/}
      <Route exact path='/sales/index' component={SaleIndexScreen}/>
      <Route exact path='/sales/new' component={SaleNewScreen}/>
      <Route exact path='/sales/table/:search' component={SaleTableScreen}/>
      <Route exact path='/sales/member/:search' component={SaleMemberScreen}/>
      <Route exact path='/sales/edit/:search' component={SaleEditScreen}/>
      <Route exact path='/sales/id/:id' component={SaleIdScreen}/>
      <Route exact path='/sales/account/:id' component={SaleAccountScreen}/>
      <Route exact path='/sales/password/:id' component={SalePasswordScreen}/>
      {/*members*/}
      <Route exact path='/members/index' component={MemberIndexScreen}/>
      <Route exact path='/members/new' component={MemberNewScreen}/>
      <Route exact path='/members/table/:search' component={MemberTableScreen}/>
      <Route exact path='/members/table/memberName/:search' component={MemberTableByMemmberNameScreen}/>
      <Route exact path='/members/table/refereeId/:search' component={MemberTableByRefereeIdScreen}/>
      <Route exact path='/members/edit/:search' component={MemberEditScreen}/>
      <Route exact path='/members/id/:id' component={MemberIdScreen}/>
      {/*employees*/}
      <Route exact path='/employees/index' component={EmployeeIndexScreen}/>
      <Route exact path='/employees/new' component={EmployeeNewScreen}/>
      <Route exact path='/employees/table/:search' component={EmployeeTableScreen}/>
      <Route exact path='/employees/edit/:search' component={EmployeeEditScreen}/>
      <Route exact path='/employees/id/:id' component={EmployeeIdScreen}/>
      <Route exact path='/employees/account/:id' component={EmployeeAccountScreen}/>
      <Route exact path='/employees/password/:id' component={EmployeePasswordScreen}/>
      {/*tables*/}
      <Route exact path='/tables/index' component={TableIndexScreen}/>
      <Route exact path='/tables/table/:id' component={TableTableScreen}/>
      {/*reports*/}
      <Route exact path='/reports/index' component={ReportIndexScreen}/>
      <Route exact path='/reports/member/:startDate/:endDate/:id' component={MemberReportScreen}/>
      <Route exact path='/reports/referee/:startDate/:endDate/:id' component={RefereeReportScreen}/>
      <Route exact path='/reports/referee/day/:date' component={RefereeDayReportScreen}/>
      <Route exact path='/reports/sale/:startDate/:endDate/:id/' component={SaleReportScreen}/>
      {/*nomatch*/}
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

export default Router