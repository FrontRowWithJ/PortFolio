import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import Error404 from "./Error404";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/404" exact component={Error404} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};
export default App;
