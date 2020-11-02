import React from "react";
import LinkedIn from "./LinkedIn.js";
import Github from "./Github.js";
import Textbox from "./ProjectTexbBox.js";
import "./proj-blurb.css";

function ProjectBlurb(props) {
    const filter = `drop-shadow(-20px -20px 10px ${props.filter1}) drop-shadow(20px 20px 10px ${props.filter2})`;
    return (
        <div
            className="project-blurb absolute flex flex-col w-64 lg:w-1/4 rounded-3xl">
            <div
                style={{
                    backgroundColor: props.backgroundColor,
                    left: props.left,
                }}
                className="absolute h-full w-full rounded-3xl">
                <div className="project-header w-full relative flex justify-center">
                    <Textbox
                        fill={props.fill}
                        filter={filter}
                        className="project-textbox absolute bottom-0" />
                    <div className="project-text absolute bottom-0 project-desc text-white">
                        <h1 className="uppercase">{props.description}</h1>
                    </div>
                    <img
                        className="project-img absolute w-16 h-16"
                        alt={props.alt}
                        src={props.projectImage}></img>
                </div>
                <div className="link-container absolute bottom-0 flex flex-row w-full items-center self-end">
                    <a
                        className="linkedin flex-grow"
                        href="https://www.linkedin.com/in/adebusum/">
                        <LinkedIn />
                    </a>
                    <a
                        className="github flex-grow"
                        href="https://github.com/FrontRowWithJ">
                        <Github />
                    </a>
                    <a
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
