import React, { useState } from 'react'
import headshot from "./empty-headshot.jpg"
import Github from "./Github.js"
import LinkedIn from "./LinkedIn.js"
import ProjectButton from "./ProjectButton.js"
import ProjectBlurb from "./ProjectBlurb"
import projectImage1 from "./mandelbrot_set.png";
import algotodata from "./algotodata_logo.png";

function App() {
    const description_1 = "Julia Playground"
    const description_2 = "Algotodata";

    const ifMain = (name, funcs = {}) => {
        if (name === "MAIN")
            for (const value in funcs)
                funcs[value](value);
    }
    const animate = (setState) => {
        const projects = [...document.getElementsByClassName("project-blurb")];
        if (projects[0].classList.contains("animate-forward"))
            projects.forEach((elem, i) => {
                setTimeout(() => {
                    elem.classList.add("animate-backward");
                    setState(false);
                    setTimeout(() => { elem.classList.remove("animate-forward") });
                }, (projects.length - i - 1) * 750);
            })
    }
    const [canRun, setCanRun] = useState(false);
    const [canShow, setCanShow] = useState(true);

    const showButton = () => {
        if (!canShow) {
            const button = document.getElementById("project-button");
            button.classList.add("project-button-reverse");
            setTimeout(() => button.classList.remove("project-button"));
            setCanShow(true);
        }
    }
    if (canRun)
        animate(setCanRun)
    return (
        <main onClick={(e) => {
            if (e.target.nodeName === "MAIN") {
                setCanRun(true);
                showButton();
            }
        }}
            className="h-full w-full flex flex-col items-center relative">
            <div id="blurb" className="relative bg-teal-500 w-64 lg:w-1/4 h-64 mt-8 flex flex-col items-center">
                <img id="profile-photo"
                    className="w-16
                           flex
                           mt-2
                           xl:w-24" src={headshot} alt="Michael's pretty face">
                </img>
                <div id="desc" className="pl-1 text-center flex flex-grow items-center sm:text-base md:text-lg">
                    <div>
                        Hey! I'm Michael. Do you like what you see?, then let's get in
                    <a className="text-white" href="mailto:michael.adebu@gmail.com"> touch</a>. If not, I'll leave you with something<a href="#" className="text-white"> better!</a>
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
            <ProjectBlurb
                filter1="#865858"
                filter2="#b67676"
                backgroundColor="#9e6767"
                left="0px"
                fill="#9e6767"
                description={description_1}
                alt="Pretty Mandelbrot Set"
                projectImage={projectImage1}
                projectLink="https://github.com/FrontRowWithJ/JuliaPlayground"
            />
            <ProjectBlurb
                filter1="#9d8133"
                filter2="#d5af45"
                backgroundColor="#b9983c"
                left="20px"
                fill="#b9983c"
                description={description_2}
                alt="Project Image"
                projectImage={algotodata}
                projectLink="https://frontrowwithj.github.io/AlgoToData/"
            />
            <ProjectButton
                canRun={canShow}
                setCanRun={setCanShow}
            />
        </main>
    );
}
export default App;