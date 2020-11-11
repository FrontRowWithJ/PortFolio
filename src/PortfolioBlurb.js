import React from 'react';
import LinkedIn from "./LinkedIn.js";
import Github from "./Github.js";
import headshot from "./empty-headshot.jpg";
import './tailwind.output.css';
import './index.css';

function PortfolioBlurb() {
    return (
        <div id="blurb" className="relative bg-teal-500 w-64 lg:w-1/4 h-64 mt-8 flex flex-col items-center">
            <img id="profile-photo"
                className="w-16
                           flex
                           mt-2
                           xl:w-24" src={headshot} alt="Michael's pretty face">
            </img>
            <div id="desc" className="pl-1 text-center flex flex-grow items-center sm:text-base md:text-lg">
                <div>
                    Hey! I'm Michael. Do you like what you see? Then let's get in
                    <a className="text-white" href="mailto:michael.adebu@gmail.com"> touch!</a> If not, I'll leave you with something<a href="#" className="text-white"> better!</a>
                </div>
            </div>
            <div id="links" className="flex-row flex justify-center w-full items-end">
                <a className="linkedin w-8 h-8 xl:h-16 xl:w-16 mr-2 mb-1" href="https://www.linkedin.com/in/adebusum/">
                    <LinkedIn className="linkedin h-full w-full" />
                </a>
                <a className="github w-8 h-8 xl:h-16 xl:w-16 ml-2 mb-1" href="https://github.com/FrontRowWithJ">
                    <Github className="github h-full w-full" />
                </a>
            </div>
        </div>
    );
}

export default PortfolioBlurb;