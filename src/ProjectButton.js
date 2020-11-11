import React, { useEffect } from 'react';
import "./proj-button.css";

const DELAY = 750;
const animate = (isForward, condition, blur) => {
    const button = document.getElementById("project-button");
    button.classList.add(isForward ? "project-button" : "project-button-reverse");
    button.classList.remove(isForward ? "project-button-reverse" : "project-button");
    document.getElementById("blurb").style.filter = `blur(${blur})`;
    const projects = [...document.getElementsByClassName("project-blurb")];
    if (condition) {
        projects.forEach((elem, i) => {
            setTimeout(() => {
                elem.classList.add(isForward ? "animate-forward" : "animate-backward");
                elem.classList.remove(isForward ? "animate-backward" : "animate-forward");
            }, isForward ? DELAY * i : (projects.length - i - 1) * DELAY);
        });
    }
    const navButton = document.getElementById("nav-container");
    if (isForward)
        navButton.style.left = "10vw";
    navButton.classList.toggle("opacity-anim");
    if (!isForward)
        setTimeout(() => navButton.style.left = "-40vw", 1000);
}

function ProjectButton(props) {

    useEffect(() => {
        if (props.animateForward === true) {
            // Hide the button and show the projects
            animate(true, true, "10px");
            const navButton = document.getElementById("nav-container");
            navButton.style.left = "";
            navButton.classList.add("to-opaque");
            setTimeout(() => { navButton.classList.remove("to-transparent") });
        } else if (props.animateForward === false) {
            // Show the button and hide the projects
            const elem = document.getElementsByClassName("project-blurb")[0];
            animate(false, elem.classList.contains("animate-forward"), "0px");
        }
    }, [props.animateForward, props.setAnimateForward]);
    return (
        <div id="project-button" className="absolute text-xl w-64 lg:w-1/4 text-white text-center"
            onClick={() => {
                if (props.toggle) {
                    props.setAnimateForward(true);
                    props.setToggle(false);
                }
            }}>
            <span>Projects?</span>
        </div>
    );
}

export default ProjectButton;