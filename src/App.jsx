import React, { useEffect } from "react";
import { Route, HashRouter as Router } from "react-router-dom";
import Home from "./Home";
import Error404 from "./Error404";
import init from "./newParticle";
import "./style/index.css"
const App = () => {
  useEffect(init, []);
  return (
    <>
      <Router basename="/">
        <canvas id="bg-canvas"></canvas>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/404" exact component={() => <Error404 />} />
      </Router>
    </>
  );
};
export default App;
