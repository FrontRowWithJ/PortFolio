import React from "react";
import LinkedIn from "./LinkedIn.js";
import Github from "./Github.js";
import Textbox from "./ProjectTexbBox.js";
import "./proj-blurb.css";

const isActive = (index) => {
    return +document.getElementById(`container-${index}`).style.zIndex === (1 | 0);
}
const getElements = (index) => {
    const image = document.getElementById(`image-${index}`);
    const textbox = document.getElementById(`textbox-${index}`);
    const githubLink = document.getElementById(`github-link-${index}`);
    const linkedinLink = document.getElementById(`linkedin-link-${index}`);
    const projectLink = document.getElementById(`project-link-${index}`);
    const projectText = document.getElementById(`project-text-${index}`);
    return [image, textbox, githubLink, linkedinLink, projectLink, projectText];
}
function ProjectBlurb(props) {
    const filter = `drop-shadow(-20px -20px 10px ${props.filter1}) drop-shadow(20px 20px 10px ${props.filter2})`;
    return (
        <div id={`container-${props.index}`}
            className="project-blurb absolute flex flex-col w-64 lg:w-1/4 rounded-3xl"
            style={{ zIndex: props.zIndex }}
            onMouseMove={(e) => {
                const i = props.index | 0;
                if (isActive(i)) {
                    const xAxis = (window.innerWidth / 2 - e.pageX) / 10;
                    const yAxis = (window.innerHeight / 2 - e.pageY) / 10;
                    const card = document.getElementById(`card-${i}`);
                    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
                }
            }}
            onMouseEnter={() => {
                const i = props.index | 0;
                if (isActive(i)) {
                    const card = document.getElementById(`card-${i}`);
                    card.style.transition = "none";
                    const [image, textbox, githubLink, linkedinLink, projectLink, projectText] = getElements(i);
                    projectText.style.transform = "translateZ(100px)";
                    image.style.transform = "translateZ(200px)";

                }
            }}
            onMouseLeave={() => {
                const i = props.index | 0;
                if (isActive(i)) {
                    const card = document.getElementById(`card-${i}`);
                    card.style.transition = "all .5s ease";
                    card.style.transform = "rotateY(0deg) rotateX(0deg)"
                    const arr = getElements(i);
                    arr.forEach((elem) => {
                        elem.style.transform = "translateZ(0)";
                    });
                }
            }}
        >
            <div
                style={{
                    backgroundColor: props.backgroundColor,
                    left: props.left
                }}
                id={`card-${props.index}`}
                className="card absolute h-full w-full rounded-3xl">
                <div className="project-header w-full relative flex justify-center">
                    <Textbox
                        fill={props.fill}
                        filter={filter}
                        className="project-textbox absolute bottom-0"
                        id={`textbox-${props.index}`} />
                    <div id={`project-text-${props.index}`} className="project-text absolute bottom-0 project-desc text-white">
                        <h1 className="uppercase">{props.description}</h1>
                    </div>
                    <img
                        id={`image-${props.index}`}
                        className="project-img absolute w-16 h-16"
                        alt={props.alt}
                        src={props.projectImage}></img>
                </div>
                <div className="link-container absolute bottom-0 flex flex-row w-full items-center self-end">
                    <a
                        id={`linkedin-link-${props.index}`}
                        className="linkedin flex-grow"
                        href="https://www.linkedin.com/in/adebusum/">
                        <LinkedIn />
                    </a>
                    <a
                        id={`github-link-${props.index}`}
                        className="github flex-grow"
                        href="https://github.com/FrontRowWithJ">
                        <Github />
                    </a>
                    <a
                        id={`project-link-${props.index}`}
                        className="project-link rounded-full text-white flex justify-center"
                        href={props.projectLink}>
                        View Project
                    </a>
                </div>
            </div>
        </div>
    );
}
export default ProjectBlurb;
