import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Error404 from "./Error404";
const App = () => {
  return (
    <Router>
      <Route path="/Portfolio/" exact component={Home} />
      <Route path="/Portfolio/404" exact component={Error404} />
    </Router>
  );
};
export default App;
