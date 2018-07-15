// node module
import React from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
// local components
// screens
import SessionScreen from "./screens/SessionScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
import MainScreen from "./screens/MainScreen"
// mains
import ClubScreen from "./screens/mains/ClubScreen"
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
      <Route path="/mains" component={MainScreen} />
      <Route path="/mains/club" component={ClubScreen} />
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