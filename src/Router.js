// node module
import React from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
// local components
import Session from "./screens/Session"
import Test from "./screens/Test"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Session} />
      <Route path="/test" component={Test} />
    </Switch>
  </BrowserRouter>
);

export default Router