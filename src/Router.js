// node module
import React from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
// local components
// screens
import SessionScreen from "./screens/SessionScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
// mains
import FunctionScreen from "./screens/mains/FunctionScreen"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SessionScreen} />
      <Route path="/welcome" component={WelcomeScreen} />
       <Route path="/mains/function" component={FunctionScreen} />
    </Switch>
  </BrowserRouter>
);

export default Router