import React, { useState, useEffect, useCallback, useRef } from "react";
import LinkedIn from "./LinkedIn";
import Github from "./Github";
import Textbox from "./ProjectTextBox";
import "./style/proj-blurb.css";
import Arrow from "./Arrow";
import ImageView from "./ImageView";
import { PROJECT_DESC, PROJECT_LIST, pageState } from "./PageState";

const ProjectBlurb = (props) => {
  const filter = `drop-shadow(-20px -20px 10px #201b28) drop-shadow(20px 20px 10px #0e0d12)`;
  const [isForward, setDirection] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const [value, toggleValue] = useState(true);
  const infoRef = useRef(null);

  const animateSVG = useCallback(() => {
    if (props.zIndex === 1) {
      const idx = props.index;
      const animate = document.getElementById("anim-" + idx);
      const svg = document.getElementById(props.textboxID);
      const img = document.getElementById("img-" + idx);
      const linkedin = document.getElementById("linkedin-" + idx);
      const github = document.getElementById("github-" + idx);
      const viewProject = document.getElementById("viewProject-" + idx);
      const text = document.getElementById("text-" + idx);
      const about = document.getElementById("about-" + idx);
      setDirection(isFirst ? true : !isForward);
      animate.beginElement();
      svg.classList.toggle("animate");
      const offset = 15;
      const refs = [svg, img, linkedin, github, viewProject];
      if (value) {
        transformSVG(svg);
        transformImage(img, offset);
        transformLinkedin(linkedin, offset);
        transformGithub(github, offset);
        transformViewProject(viewProject, offset);
      } else refs.forEach((ref) => (ref.style.transform = ""));
      [text, linkedin, github, viewProject, about].forEach((ref) =>
        toggleNode(value, ref)
      );
      toggleNode(value, svg, 0.9, "");
      toggleValue(!value);
      setIsFirst(false);
    }
  }, [
    props.zIndex,
    props.textboxID,
    props.index,
    isFirst,
    isForward,
    value,
    setDirection,
    setIsFirst,
  ]);

  useEffect(() => {
    const { style } = infoRef.current;
    if (value) style.opacity = 0;
    else style.display = "";
    setTimeout(
      () => {
        if (value) style.display = "none";
        else style.opacity = 1;
      },
      value ? 600 : 100
    );
  }, [value]);

  useEffect(() => {
    document.body.onkeyup = (event) => {
      if (event.key === "Escape" && pageState.state === PROJECT_DESC)
        animateSVG();
    };
  }, [animateSVG]);

  return (
    <>
      <section
        ref={infoRef}
        className="project-info grid"
        style={{ transition: "opacity .6s ease-in-out", opacity: 0 }}
      >
        <nav className="project-info-nav relative">
          <section className="back-button-section absolute left-0 max-h-full">
            <div onClick={animateSVG}>
              <Arrow direction="left" />
              Back
            </div>
          </section>
          <section className="view-project-section absolute right-0 max-h-full grid">
            <a href={props.projectLink}>View Project</a>
            <Github fill="none" stroke="white" />
            <LinkedIn fill="none" stroke="white" />
          </section>
        </nav>
        <article className="project-info-desc">
          <div>
            <section className="timeline-section flex items-center">
              <h3>Timeline:</h3>
              <span className="mb-4 center">{props.timeline}</span>
            </section>
            <section className="about-section flex items-center">
              <h3>About</h3>
              <span>{props.about}</span>
            </section>
            <section className="tech-section mb-4">
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
          style={{ backgroundColor: "#201b28" }}
          className="absolute h-full w-full rounded-3xl"
        >
          <div className="project-header w-full relative flex justify-center">
            <Textbox
              isForward={isForward}
              fill={"#17141D"}
              filter={filter}
              animID={"anim-" + props.index}
              id={props.textboxID}
              animateSVG={animateSVG}
              className="project-textbox absolute bottom-0"
            />
            <div
              id={"text-" + props.index}
              className="project-text absolute bottom-0 project-desc text-white"
            >
              <div className="project-text-hover relative">
                <h1 className="uppercase">{props.description}</h1>
                <h1 className="uppercase" onClick={() => animateSVG()}>
                  View More
                </h1>
              </div>
            </div>
            <div
              id={"about-" + props.index}
              style={{ transition: "opacity .4s linear" }}
              className="about-button absolute"
              onClick={() => animateSVG()}
            >
              View More
              <div className="view-more-hover absolute h-full top-0 uppercase bg-clip-text">
                View _animateSVGMore
              </div>
            </div>
            <img
              id={"img-" + props.index}
              className="project-img absolute w-16 h-16"
              alt={props.alt}
              src={props.projectImage}
            />
          </div>
          <div className="link-container absolute bottom-0 flex flex-row w-full items-center self-end">
            <LinkedIn
              id={"linkedin-" + props.index}
              linkClass="linkedin-link"
              fill="white"
            />
            <Github
              id={"github-" + props.index}
              fill="white"
              linkClass="github-link"
            />
            <a
              id={"viewProject-" + props.index}
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
      pageState.state = PROJECT_DESC;
    };
  } else {
    elem.style.zIndex = "";
    elem.style.opacity = 1;
    elem.ontransitionend = () => {
      pageState.state = PROJECT_LIST;
    };
  }
};

const transformSVG = (svg) => {
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
