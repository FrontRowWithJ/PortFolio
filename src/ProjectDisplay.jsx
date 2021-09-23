import React, { useState, useRef, useEffect, useCallback } from "react";
import NavButton from "./ProjectNavigate";
import ProjectBlurb from "./ProjectBlurb";
import ProjectButton from "./ProjectButton";
import { times } from "lodash";
import projects from "./projectData";
import { PROJECT_DESC, pageState } from "./pageState";

const getParentRect = () => {
  return document
    .getElementsByClassName("project-blurb")[0]
    .getBoundingClientRect();
};

const positionSVG = (svg) => {
  document.getElementsByClassName(
    "project-textbox"
  )[0].style.transitionDuration = "0s";
  const rect = getParentRect();
  svg.style.top = svg.style.left = 0;
  svg.style.transform = `translate(${-rect.left}px, ${-rect.top}px)`;
};

const positionImage = (img, offset) => {
  const parentRect = getParentRect();
  const rect = img.getBoundingClientRect();
  img.style.left = img.style.top = 0;
  const left = (window.innerWidth - rect.width) / 2 - parentRect.left;
  const top = parentRect.top - offset;
  img.style.transform = `translate(${left}px, ${-top}px)`;
};

const ProjectDisplay = (props) => {
  const [zIndices, setIndices] = useState([1, 0]);
  const blurbRefs = useRef(times(projects.length, () => React.createRef()));
  const handleResize = useCallback(() => {
    const i = zIndices.indexOf(1);
    const [svg, img] = ["svg", "img"].map((s) =>
      document.getElementById(`${s}-${i}`)
    );
    const offset = 15;
    if (pageState.state === PROJECT_DESC) {
      positionSVG(svg);
      positionImage(img, offset);
    }
  }, [zIndices]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="flex justify-center items-center">
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
