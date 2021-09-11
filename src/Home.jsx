import React, { useState, useEffect } from "react";
import PortfolioBlurb from "./PortfolioBlurb";
import ProjectDisplay from "./ProjectDisplay";
import { PROJECT_LIST, pageState } from "./PageState";

const Home = (props) => {
  const [animateForward, setAnimateForward] = useState(undefined);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    document.body.addEventListener("keyup", (event) => {
      if (
        event.key === "Escape" &&
        pageState.state === PROJECT_LIST &&
        !toggle
      ) {
        setAnimateForward(false);
        setToggle(true);
      }
    });
  });

  return (
    <>
      <main
        onClick={(e) => {
          const nodeName = e.target.nodeName;
          if ((nodeName === "MAIN" || nodeName === "CANVAS") && !toggle) {
            setAnimateForward(false);
            setToggle(true);
          }
        }}
        className="h-full w-full flex flex-col items-center relative"
      >
        <PortfolioBlurb />
        <ProjectDisplay
          animateForward={animateForward}
          setAnimateForward={setAnimateForward}
          toggle={toggle}
          setToggle={setToggle}
        />
      </main>
    </>
  );
};
export default Home;
