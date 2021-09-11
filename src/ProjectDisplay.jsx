import React, { useState, useRef } from "react";
import NavButton from "./ProjectNavigate";
import ProjectBlurb from "./ProjectBlurb";
import algotodataLogo from "./algotodataLogo.png";
import mandelbrot from "./mandelbrot_set.png";
import ProjectButton from "./ProjectButton";
import { times } from "lodash";
import bashImg from "./Technology Logos/bash.svg";
import cppImg from "./Technology Logos/C++.svg";
import cssImg from "./Technology Logos/CSS.svg";
import ffmpegImg from "./Technology Logos/ffmpeg.svg";
import htmlImg from "./Technology Logos/html.svg";
import javascriptImg from "./Technology Logos/javascript.svg";
import pandasImg from "./Technology Logos/pandas.svg";
import pythonImg from "./Technology Logos/python.svg";
import reactImg from "./Technology Logos/react.svg";
import tkinterImg from "./Technology Logos/tkinter.png";
import juliaImg0 from "./Project Images/julia-image-0.jpg";
import juliaImg1 from "./Project Images/julia-image-1.jpg";
import juliaImg2 from "./Project Images/julia-image-2.jpg";
import algoImg0 from "./Project Images/algotodata-img-0.jpg";
import algoImg1 from "./Project Images/algotodata-img-1.jpg";
import algoImg2 from "./Project Images/algotodata-img-2.jpg";

const projects = [
  {
    filter1: "#865858",
    filter2: "#b67676",
    backgroundColor: "#9e6767",
    fill: "#9e6767",
    description: "Julia Playground",
    alt: "Pretty Mandelbrot Set",
    projectImage: mandelbrot,
    projectLink: "https://github.com/FrontRowWithJ/JuliaPlayground",
    textboxID: "mandelbrot",
    timeline: "Aug 2019 - Aug 2019",
    about: `Julia Playground is an interactive gui (tkinter), 
    built in python that allows the user to display and interact with the mandelbrot set and corresponding Julia sets.`,
    techlist: { python: pythonImg, tkinter: tkinterImg, pandas: pandasImg },
    challenges: [
      "I reduced the run time for calculating the mandelbrot set by parallelising the computation using Panda to under 1s.",
      "Looking for an adequate image renderer that could dynamically update the mandelbrot set in a reasonable amount of time.",
    ],
    images: [
      { src: juliaImg0, alt: "Julia Playground" },
      { src: juliaImg1, alt: "Julia Playground" },
      { src: juliaImg2, alt: "Julia Playgrround" },
    ],
  },
  {
    filter1: "#9d8133",
    filter2: "#d5af45",
    backgroundColor: "#b9983c",
    fill: "#b9983c",
    description: "Algotodata",
    alt: "Project Image",
    projectImage: algotodataLogo,
    projectLink: "https://frontrowwithj.github.io/AlgoToData/",
    textboxID: "algotodata",
    timeline: "Sep 2019 - Present",
    about: `AlgoToData is a website that gets into the nitty gritty details of computer algorithms and data structures, 
    as an effective way of giving people a better understanding of computer science. It acts as a database of knowledge for all things algorithmic and data dependant.`,
    techlist: {
      HTML: htmlImg,
      CSS: cssImg,
      Javascript: javascriptImg,
      React: reactImg,
      "C++": cppImg,
      ffmpeg: ffmpegImg,
      bash: bashImg,
    },
    challenges: [
      "I made the website responsive by using CSS media queries and relative units.",
      "Effectively using perlin noise allowed for the background to appear both random and infinitely looping.",
    ],
    images: [
      { src: algoImg0, alt: "Algotodata Homepage" },
      { src: algoImg1, alt: "Algotodata Homepage" },
      { src: algoImg2, alt: "Algotodata Homepage" },
    ],
  },
];

const ProjectDisplay = (props) => {
  const [zIndices, setIndices] = useState(times(projects.length, () => 0));
  zIndices[0] = 1;
  const blurbRefs = useRef([]);
  blurbRefs.current = times(projects.length, () => React.createRef());
  return (
    <div className="flex justify-center">
      {projects.map((obj, i) => {
        return (
          <ProjectBlurb
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
            timeline={obj.timeline}
            about={obj.about}
            techlist={obj.techlist}
            challenges={obj.challenges}
            images={obj.images}
          />
        );
      })}
      <NavButton
        numOfProjects={projects.length}
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
};

export default ProjectDisplay;
