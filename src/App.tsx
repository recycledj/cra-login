import React from "react";
import "./App.css";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL || "/",
});

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
