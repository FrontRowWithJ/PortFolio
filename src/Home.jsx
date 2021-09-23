import React, { useState, useEffect, useCallback } from "react";
import PortfolioBlurb from "./PortfolioBlurb";
import ProjectDisplay from "./ProjectDisplay";
import { PROJECT_LIST, pageState } from "./pageState";

const Home = () => {
  const [animateForward, setAnimateForward] = useState(undefined);
  const [toggle, setToggle] = useState(true);

  const handleKeyUp = useCallback(
    (event) => {
      if (
        event.key === "Escape" &&
        pageState.state === PROJECT_LIST &&
        !toggle
      ) {
        setAnimateForward(false);
        setToggle(true);
      }
    },
    [setAnimateForward, setToggle, toggle]
  );
  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyUp);
    return () => document.addEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
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
  );
};
export default Home;
