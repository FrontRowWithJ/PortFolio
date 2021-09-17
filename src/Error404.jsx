import React from "react";
import "./style/error-404.css";
import NiceArrow from "./NiceArrow";
import { setFactor, FORWARD } from "./Particle";

const Error404 = (props) => {
  return (
    <main id="error-404-main">
      <div id="error-404-container">
        <div id="error-number">4&#x2639;4</div>
        <p className="error-message">
          It seems that a better developer doesn't exist.
        </p>
        <p className="error-message">
          Don't worry! I have the right solution just for you!
        </p>
        <a className="back-button" href="#/" onClick={() => setFactor(FORWARD)}>
          <NiceArrow className="back-arrow" direction="left" />
          <span id="back-text">It's me</span>
        </a>
      </div>
    </main>
  );
};

export default Error404;
