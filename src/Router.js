// node module
import React from "react"
import { BrowserRouter , Route, Switch } from "react-router-dom"
// local components
// auths
import SessionScreen from "./screens/SessionScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
// mains
// clubs
import IndexScreen from "./screens/mains/IndexScreen"
import ClubIndexScreen from "./screens/mains/clubs/ClubIndexScreen"
import ClubNewScreen from "./screens/mains/clubs/ClubNewScreen"
import ClubTableScreen  from "./screens/mains/clubs/ClubTableScreen"
import ClubEditScreen from "./screens/mains/clubs/ClubEditScreen"
// referees
import RefereeIndexScreen from "./screens/mains/referees/RefereeIndexScreen"
// sales
import SalesIndexScreen from "./screens/mains/sales/SalesIndexScreen"
// members
import MemberIndexScreen from "./screens/mains/members/MemberIndexScreen"
// employees
import EmployeeIndexScreen from "./screens/mains/employees/EmployeeIndexScreen"
// reports
import ReportIndexScreen from "./screens/mains/reports/ReportIndexScreen"
// tables
import TableIndexScreen from "./screens/mains/tables/TableIndexScreen"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SessionScreen}/>
      <Route path="/welcomes" component={WelcomeScreen}/>
      <Route path="/mains/index" component={IndexScreen}/>
      {/*clubs*/}
      <Route path="/mains/clubs/index" component={ClubIndexScreen}/>
      <Route path="/mains/clubs/new" component={ClubNewScreen}/>
      <Route path="/mains/clubs/table" component={ClubTableScreen}/>
      <Route path="/mains/clubs/edit" component={ClubEditScreen}/>
      {/*referees*/}
      <Route path="/mains/referees/index" component={RefereeIndexScreen}/>
      {/*sales*/}
      <Route path="/mains/sales/index" component={SalesIndexScreen}/>
      {/*members*/}
      <Route path="/mains/members/index" component={MemberIndexScreen}/>
      {/*employees*/}
      <Route path="/mains/employees/index" component={EmployeeIndexScreen}/>
      {/*reports*/}
      <Route path="/mains/reports/index" component={ReportIndexScreen}/>
      {/*tables*/}
      <Route path="/mains/tables/index" component={TableIndexScreen}/>
    </Switch>
  </BrowserRouter>
)

export default Router