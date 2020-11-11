import React, { useState } from 'react'
import PortfolioBlurb from "./PortfolioBlurb.js";
import ProjectDisplay from "./ProjectDisplay.js";
function App() {
    const [animateForward, setAnimateForward] = useState(undefined);
    const [toggle, setToggle] = useState(true);
    return (
        <main onClick={(e) => {
            if (e.target.nodeName === "MAIN" && !toggle) {
                setAnimateForward(false);
                setToggle(true);
            }
        }}
            className="h-full w-full flex flex-col items-center relative">
            <PortfolioBlurb />
            <ProjectDisplay 
                animateForward={animateForward}
                setAnimateForward={setAnimateForward}
                toggle={toggle}
                setToggle={setToggle}
            />
        </main>
    );
}
export default App;