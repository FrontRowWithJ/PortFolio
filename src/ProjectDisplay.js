import React, { useState, useRef } from 'react';
import NavButton from './ProjectNavigate'
import ProjectBlurb from './ProjectBlurb'
import algotodataLogo from './algotodataLogo.png'
import mandelbrot from './mandelbrot_set.png'
import ProjectButton from './ProjectButton'

const projects = [{
    filter1: "#865858",
    filter2: "#b67676",
    backgroundColor: "#9e6767",
    fill: "#9e6767",
    description: "Julia Playground",
    alt: "Pretty Mandelbrot Set",
    projectImage: mandelbrot,
    projectLink: "https://github.com/FrontRowWithJ/JuliaPlayground",
    textboxID: "mandelbrot"
}, {
    filter1: "#9d8133",
    filter2: "#d5af45",
    backgroundColor: "#b9983c",
    fill: "#b9983c",
    description: "Algotodata",
    alt: "Project Image",
    projectImage: algotodataLogo,
    projectLink: "https://frontrowwithj.github.io/AlgoToData/",
    textboxID: "algotodata"
}];

const ProjectDisplay = (props) => {
    const arr = new Array(projects.length).fill(0);
    arr[0] = 1;
    const [zIndices, setIndices] = useState(arr);
    const blurbRefs = useRef([]);
    blurbRefs.current = arr.map(() => React.createRef());
    return (
        <div className="flex justify-center">
            {projects.map((obj, i) => {
                return (<ProjectBlurb
                    key={i}
                    blurbRef={blurbRefs.current[i]}
                    index={i}
                    filter1={obj.filter1}
                    filter2={obj.filter2}
                    backgroundColor={obj.backgroundColor}
                    fill={obj.fill}
                    description={obj.description}
                    alt={obj.alt}
                    projectImage={obj.projectImage}
                    projectLink={obj.projectLink}
                    zIndex={zIndices[i]}
                    textboxID={obj.textboxID}
                />)
            })}
            <NavButton numOfProjects={projects.length}
                zIndices={zIndices}
                setIndices={setIndices}
                blurbRefs={blurbRefs}
            />
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