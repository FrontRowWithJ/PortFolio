import React from 'react';
import './App.css';
import headshot from "./empty-headshot.jpg"
import downArrow from "./down-arrow.svg"
import Proj from "./ProjectBar.js";
import ProjectBlurb from "./ProjectBlurb.js"
import juliaPlayground from "./julia-playground.svg"

function PortfolioImage(props) {
  return (
    <div id="portfolio-img-container">
      <img src={props.src} alt="Michael Adebusuyi" id="portfolio-image">
      </img>
    </div>
  );
}
function PortfolioDescription(props) {
  return (
     <span id={props.id}>
       {props.innerHTML}
     </span>
  );
}

function ScrollDownButton(props) {
  return (
    <div id={props.id}>
    <span id="scroll-btn-text"> {"Projects"}</span>
    <img src={props.src} alt="Scroll Down Button"></img>
    </div>
  );
}

const desciption="I'm a profficient web developer, with expertise in React, HTML, CSS and javascript.";
function App() {
  return (
  <Main></Main>
  );
}

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {"backgroundImage" : "",
                  "widths": {}};
    this.updateBG = this.updateBG.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.getWidth = this.getWidth.bind(this);
  }

  updateBG(image){
    this.setState({"backgroundImage": image});
  }

  getWidth(id){
    return this.state.widths[id];
  }

  updateWidth(id, width){
    const widths = this.state.widths;
    let newWidths = {};
    for(const id in widths)
      newWidths[id] = "5vw";
    newWidths[id] = width;
    this.setState({"widths": newWidths});
  }


  render() {
    const bg = this.state.backgroundImage;
    return (<main style={{backgroundImage :`url("${bg}")`}}>
      <div id="portfolio" color="red">
      <PortfolioImage src={headshot}>
      </PortfolioImage>
      <PortfolioName name="Michael Adebusuyi"></PortfolioName>
      <PortfolioDescription id="portfolio-desc" innerHTML={desciption}>
      </PortfolioDescription>
      <ScrollDownButton src={downArrow} id="portfolio-scroll"></ScrollDownButton>
    </div>
    <Proj changeBG={this.updateBG}
          updateWidth={this.updateWidth}
          getWidth={this.getWidth}>
    </Proj>
    <ProjectBlurb bottom={0}
                  description={`Julia Playground is an interactive gui.`}
                  projectImage={juliaPlayground}
                  githubLink="https://github.com/FrontRowWithJ"
                  linkedInLink="https://www.linkedin.com/in/adebusum/"
                  projectLink="https://github.com/FrontRowWithJ/JuliaPlayground"
    ></ProjectBlurb>
    </main>);
  }
}
function PortfolioName(props){
  return (
    <span id="portfolio-name">{props.name}</span>
  );
}


export default App;