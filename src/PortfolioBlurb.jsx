import React from "react";
import LinkedIn from "./LinkedIn";
import Github from "./Github";
import headshot from "./images/empty-headshot.jpg";
import { setFactor, BACKWARD } from "./newParticle";
import "./tailwind.output.css";
import "./style/index.css";

const PortfolioBlurb = () => {
  return (
    <div id="blurb-bg" className="w-64 lg:w-1/4">
      <div id="blurb">
        <div id="prof-container">
          <img id="profile-photo" src={headshot} alt="Michael Adebusuyi" />
        </div>
        <div id="desc">
          <div>
            Hey! I'm Michael. Do you like what you see? Then let's get in
            <a className="text-white" href="mailto:michael.adebu@gmail.com">
              &nbsp;touch!
            </a>
            &nbsp; If not, I'll leave you with something
            <a
              href="#/404"
              className="text-white"
              onClick={() => setFactor(BACKWARD)}
            >
              &nbsp;better!
            </a>
          </div>
        </div>
        <div id="links">
          <LinkedIn fill="white" className="linkedin-svg" />
          <Github fill="white" className="github-svg" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioBlurb;
