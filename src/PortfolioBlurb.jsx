import React from "react";
import headshot from "./images/empty-headshot.jpg";
import { setFactor, BACKWARD } from "./newParticle";
import "./tailwind.output.css";
import "./style/portfolio-blurb.css";
import SocialLink from "./SocialLink";

const PortfolioBlurb = () => {
  return (
    <div id="blurb-container">
      <div>
        <div>
          Hey! I'm Michael. Do you like what you see? Then let's get in
          <a href="mailto:michael.adebu@gmail.com">&nbsp;touch!</a>
          <SocialLink icon="linkedin" fill="white" className="social-link" />
        </div>
      </div>
      <div>
        <img src={headshot} alt="Michael Adebusuyi" />
      </div>
      <div>
        <div>
          If not, I'll leave you with something
          <a href="#/404" onClick={() => setFactor(BACKWARD)}>
            &nbsp;better!
          </a>
        </div>
        <SocialLink icon="github" fill="white" className="social-link" />
      </div>
    </div>
  );
};

export default PortfolioBlurb;
