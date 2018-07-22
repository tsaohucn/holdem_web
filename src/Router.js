// node module
import React from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
// local components
// auths
import SessionScreen from "./screens/SessionScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
// mains
import IndexScreen from "./screens/mains/IndexScreen"
import ClubIndexScreen from "./screens/mains/clubs/ClubIndexScreen"
import ClubNewScreen from "./screens/mains/clubs/ClubNewScreen"
import ClubTableScreen  from "./screens/mains/clubs/ClubTableScreen"
import ClubEditScreen from "./screens/mains/clubs/ClubEditScreen"

import RefereeScreen from "./screens/mains/RefereeScreen"
import SalesScreen from "./screens/mains/SalesScreen"
import MemberScreen from "./screens/mains/MemberScreen"
import EmployeeScreen from "./screens/mains/EmployeeScreen"
import ReportScreen from "./screens/mains/ReportScreen"
import LiveScreen from "./screens/mains/LiveScreen"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SessionScreen} />
      <Route path="/welcomes" component={WelcomeScreen} />
      <Route path="/mains/index" component={IndexScreen} />
      <Route path="/mains/clubs/index" component={ClubIndexScreen} />
      <Route path="/mains/clubs/new" component={ClubNewScreen} />
      <Route path="/mains/clubs/table" component={ClubTableScreen} />
      <Route path="/mains/clubs/edit" component={ClubEditScreen} />
      <Route path="/mains/referee" component={RefereeScreen} />
      <Route path="/mains/sales" component={SalesScreen} />
      <Route path="/mains/member" component={MemberScreen} />
      <Route path="/mains/employee" component={EmployeeScreen} />
      <Route path="/mains/report" component={ReportScreen} />
      <Route path="/mains/live" component={LiveScreen} />
    </Switch>
  </BrowserRouter>
);

export default Router