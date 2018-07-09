// node module
import React from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
// local components
import Session from "./screens/Session"
import Welcome from "./screens/Welcome"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Session} />
      <Route path="/welcome" component={Welcome} />
    </Switch>
  </BrowserRouter>
);

export default Router