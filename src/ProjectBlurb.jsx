import React, { useState } from "react";
import Linkedin from "./Linkedin";
import Github from "./Github";
import Textbox from "./ProjectTextBox";
import "./proj-blurb.css";
import Arrow from "./Arrow";
import ImageView from "./ImageView";
import { times } from "lodash";

const ProjectBlurb = (props) => {
  // const filter = `drop-shadow(-20px -20px 10px ${props.filter1}) drop-shadow(20px 20px 10px ${props.filter2})`;
  const filter = `drop-shadow(-20px -20px 10px #201b28) drop-shadow(20px 20px 10px #0e0d12)`;
  const [
    svgRef,
    animateRef,
    imgRef,
    linkedinRef,
    githubRef,
    viewProjectRef,
    textRef,
    aboutRef,
  ] = times(8, () => React.createRef());
  const [isForward, setDirection] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const [value, toggleValue] = useState(true);
  const [color, setColor] = useState("white");
  const animateSVG = () => {
    if (props.zIndex === 1) {
      setDirection(isFirst ? true : !isForward);
      animateRef.current.beginElement();
      svgRef.current.classList.toggle("animate");
      const offset = 15;
      const refs = [svgRef, imgRef, linkedinRef, githubRef, viewProjectRef];
      if (value) {
        transformSVG(svgRef.current, offset);
        transformImage(imgRef.current, offset);
        transformLinkedin(linkedinRef.current, offset);
        transformGithub(githubRef.current, offset);
        transformViewProject(viewProjectRef.current, offset);
      } else {
        refs.forEach((ref) => (ref.current.style.transform = ""));
      }
      [textRef, linkedinRef, githubRef, viewProjectRef, aboutRef].forEach(
        (ref) => toggleNode(value, ref.current)
      );
      toggleNode(value, svgRef.current, 0.4, "");
      toggleValue(!value);
      setIsFirst(false);
    }
  };
  return (
    <>
      <section
        className="project-info grid"
        style={{ display: value ? "none" : "" }}
      >
        <nav className="project-info-nav relative">
          <section className="back-button-section absolute left-0 max-h-full">
            <div onClick={() => animateSVG()}>
              <Arrow
                direction="left"
                className="back-arrow"
                stroke={color}
                style={{ transition: "transform .5s ease-in-out" }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateX(-50%)";
                  setColor("black");
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "";
                  setColor("white");
                }}
              ></Arrow>
              Back
            </div>
          </section>
          <section className="view-project-section absolute right-0 max-h-full grid">
            <a href={props.projectLink}>View Project</a>
            <a href="https://www.linkedin.com/in/adebusum/">
              <Github fill="none" stroke="white" />
            </a>
            <a href="https://github.com/FrontRowWithJ">
              <Linkedin fill="none" stroke="white" />
            </a>
          </section>
        </nav>
        <article className="project-info-desc">
          <div>
            <section className="timeline-section">{props.timeline}</section>
            <section className="about-section">
              <h3>About</h3>
              <span>{props.about}</span>
            </section>
            <section className="tech-section">
              <h3>Technologies used:</h3>
              <ol>
                {Object.keys(props.techlist).map((tech, index) => {
                  return (
                    <li key={index} className="techlist">
                      <img alt="" src={props.techlist[tech]} />
                      {tech}
                    </li>
                  );
                })}
              </ol>
            </section>
            <section className="challenges-section">
              <h3>Challenges faced:</h3>
              <ol>
                {props.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ol>
            </section>
          </div>
        </article>
        <aside className="desc-img flex flex-wrap justify-center items-center p-6">
          <ImageView alt="algoToData logo" images={props.images}></ImageView>
        </aside>
      </section>
      <div
        className="project-blurb relative flex rounded-3xl lg:w-1/4"
        ref={props.blurbRef}
        style={{ zIndex: props.zIndex }}
      >
        <div
          style={{
            // backgroundColor: "#17141D",
            backgroundColor: "#02040F",
            // "boxShadow": `-1rem 0 3rem ${props.filter1}`
          }}
          className="card absolute h-full w-full rounded-3xl"
        >
          <div className="project-header w-full relative flex justify-center">
            <Textbox
              isForward={isForward}
              svgRef={svgRef}
              animateRef={animateRef}
              fill={"#17141D"}
              filter={filter}
              id={props.textboxID}
              animateSVG={() => animateSVG()}
              className="project-textbox absolute bottom-0"
            />
            <div
              ref={textRef}
              className="project-text absolute bottom-0 project-desc text-white"
            >
              <div className="project-text-hover relative">
                <h1 className="uppercase">{props.description}</h1>
                <h1
                  className="uppercase"
                  onClick={() => {
                    animateSVG();
                  }}
                >
                  View More
                </h1>
              </div>
            </div>
            <div
              ref={aboutRef}
              style={{ transition: "opacity .4s linear" }}
              className="about-button absolute"
              onClick={() => {
                animateSVG();
              }}
            >
              View More
              <div className="view-more-hover absolute h-full top-0 uppercase bg-clip-text">
                View More
              </div>
            </div>
            <img
              ref={imgRef}
              className="project-img absolute w-16 h-16"
              alt={props.alt}
              src={props.projectImage}
            />
          </div>
          <div className="link-container absolute bottom-0 flex flex-row w-full items-center self-end">
            <a
              ref={linkedinRef}
              className="linkedin-link flex-grow"
              href="https://www.linkedin.com/in/adebusum/"
            >
              <Linkedin fill="white" />
            </a>
            <a
              ref={githubRef}
              className="github-link flex-grow"
              href="https://github.com/FrontRowWithJ"
            >
              <Github fill="white" />
            </a>
            <a
              ref={viewProjectRef}
              className="project-link rounded-full text-white flex justify-center"
              href={props.projectLink}
            >
              View Project
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const toggleNode = (value, elem, opacity = 0, zIndex = "-1") => {
  if (value) {
    elem.style.opacity = opacity;
    elem.ontransitionend = () => {
      elem.style.zIndex = zIndex;
      elem.ontransitionend = null;
    };
  } else {
    elem.style.zIndex = "";
    elem.style.opacity = 1;
  }
};

const transformSVG = (svg, offset) => {
  const rect = svg.getBoundingClientRect();
  const translateX = rect.left + rect.width / 2 - window.innerWidth / 2;
  const translateY = window.innerHeight - rect.bottom;
  svg.style.transform = `translate(${-translateX}px, ${translateY}px)`;
};

const transformImage = (img, offset) => {
  const rect = img.getBoundingClientRect();
  const translateX = (window.innerWidth - rect.right - rect.x) / 2;
  const translateY = rect.top - offset;
  img.style.transform = `translate(${translateX}px, ${-translateY}px)`;
};

const transformLinkedin = (linkedin, offset) => {
  const rect = linkedin.getBoundingClientRect();
  const translateX = rect.x - offset;
  const translateY = window.innerHeight - rect.bottom - offset;
  linkedin.style.transform = `translate(${-translateX}px, ${translateY}px)`;
};

const transformGithub = (github, offset) => {
  const rect = github.getBoundingClientRect();
  const translateX = (window.innerWidth - rect.right - rect.x) / 2;
  const translateY = window.innerHeight - rect.bottom - offset;
  github.style.transform = `translate(${translateX}px, ${translateY}px)`;
};

const transformViewProject = (viewProject, offset) => {
  const rect = viewProject.getBoundingClientRect();
  const translateX = window.innerWidth - rect.right - offset;
  const translateY = window.innerHeight - rect.bottom - offset;
  viewProject.style.transform = `translate(${translateX}px, ${translateY}px)`;
};

export default ProjectBlurb;
