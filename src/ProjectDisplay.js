import React, { useState } from 'react';
import NavButton from "./ProjectNavigate.js";
import ProjectBlurb from "./ProjectBlurb";
import algotodataLogo from "./algotodataLogo.png";
import mandelbrot from "./mandelbrot_set.png";
import ProjectButton from "./ProjectButton.js"

const projects = [{
    filter1: "#865858",
    filter2: "#b67676",
    backgroundColor: "#9e6767",
    fill: "#9e6767",
    description: "Julia Playground",
    alt: "Pretty Mandelbrot Set",
    projectImage: mandelbrot,
    projectLink: "https://github.com/FrontRowWithJ/JuliaPlayground",
}, {
    filter1: "#9d8133",
    filter2: "#d5af45",
    backgroundColor: "#b9983c",
    fill: "#b9983c",
    description: "Algotodata",
    alt: "Project Image",
    projectImage: algotodataLogo,
    projectLink: "https://frontrowwithj.github.io/AlgoToData/"
}];

const offset = 40;
function ProjectDisplay(props) {
    const arr = [];
    arr.length = projects.length;
    arr.fill(0);
    arr[0] = 1;
    const [zIndices, setIndices] = useState(arr);
    return (
        <div className="flex justify-center">
            {projects.map((obj, i) => {
                return (<ProjectBlurb
                    key={i}
                    index={i}
                    filter1={obj.filter1}
                    filter2={obj.filter2}
                    backgroundColor={obj.backgroundColor}
                    left={`${offset * i}px`}
                    fill={obj.fill}
                    description={obj.description}
                    alt={obj.alt}
                    projectImage={obj.projectImage}
                    projectLink={obj.projectLink}
                    zIndex={zIndices[i]}
                />)
            })}
            <NavButton numOfProjects={projects.length}
                zIndices={zIndices}
                setIndices={setIndices} />
            <ProjectButton
                animateForward={props.animateForward}
                toggle={props.toggle}
                setAnimateForward={props.setAnimateForward}
                setToggle={props.setToggle}
            />
        </div>
    );
}

export default ProjectDisplay;