import React, { useState, useRef } from "react";
import NavButton from "./ProjectNavigate";
import ProjectBlurb from "./ProjectBlurb";
import ProjectButton from "./ProjectButton";
import { times } from "lodash";
import projects from "./projectData";

const ProjectDisplay = (props) => {
  const [zIndices, setIndices] = useState(times(projects.length, () => 0));
  zIndices[0] = 1;
  const blurbRefs = useRef(times(projects.length, () => React.createRef()));
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
