/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Arrow from './Arrow'
import './proj-nav.css'

const eventHandler = (target, size, transform) => {
    target.style.width = target.style.height = size;
    target.style.transform = transform;
}

const enable = (target) => {
    target.onmouseover = () => eventHandler(target, "3rem", "translate(-.25rem, -.25rem)");
    target.onmouseout = () => eventHandler(target, "2.5rem", "");
    target.style.cursor = "pointer";
    target.style.opacity = 1;
}

const disable = (target) => {
    target.onmouseover = undefined;
    target.onmouseout = undefined;
    target.style.cursor = "not-allowed";
    target.style.opacity = .5;
    eventHandler(target, "2.5rem", "");
}

const ProjectNavigate = (props) => {
    const [index, setIndex] = useState(0);
    const [isEnabled, setEnable] = useState(true);
    useEffect(() => {
        const [l, r] = [...document.getElementById("nav-container").children];
        if (index === 0) disable(l);
        if (index === props.numOfProjects - 1) disable(r);
        if (index === 1) enable(l);
        if (index === props.numOfProjects - 2) enable(r);
        const arr = [];
        arr.length = props.numOfProjects;
        arr.fill(0);
        arr[index] = 1;
        props.setIndices(arr);
    }, [index]);

    const animateCardSwitch = (index) => {
        setEnable(false);
        const projectBlurb = props.blurbRefs.current[index].current;
        projectBlurb.classList.toggle("translate-anim");
        projectBlurb.ontransitionend = () => {
            projectBlurb.classList.toggle("translate-anim");
            setIndex(index);
            projectBlurb.ontransitionend = null;
            setEnable(true);
        }
    }

    return (
        <div id="nav-container" style={{ bottom: "10vh", left: "-40vw", transition: "opacity .5s" }} className="opacity-0 absolute grid grid-cols-2 grid-rows-1 gap-2 h-12 w-24">
            <Button
                gridPos="col-start-1 col-end-2"
                onclick={() => {
                    if (index > 0 && isEnabled) {
                        animateCardSwitch(index - 1);
                    }
                }}
                rotate="180"
            />
            <Button
                gridPos="col-start-2 col-end-3"
                onclick={() => {
                    if (index < props.numOfProjects - 1 && isEnabled) {
                        animateCardSwitch(index + 1);
                    }
                }}
            />
        </div>
    );
}

const Button = (props) => {
    return (
        <div className={"rounded-full h-10 w-10 flex items-center justify-center " + props.gridPos}
            onClick={props.onclick}
            style={{ background: "rgba(255, 255, 255, .5" }}>
            <Arrow rotate={props.rotate} />
        </div>
    );
}
export default ProjectNavigate;