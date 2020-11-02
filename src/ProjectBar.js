import React, {Component} from 'react';
import img0 from "./image.jpg";
import img1 from "./bg-photo-1.jpeg";
import img2 from "./bg-photo-3.webp";
import img3 from "./bg-photo.jpeg";
const images = [img0, img1, img2, img3];
const unit  = "vw";
const colors = ["red", "green", "blue", "yellow", "purple"];
const numOfElemes = 2;
const width = 5;

const style = {
  width: `${width * (numOfElemes + 1) + unit}`,
  height: `${width + unit}`,
  backgroundColor: "white",
  display: "flex",
  flexDirection: "row",
  position: "relative"
};

const ProjectBar=(props) =>{
  return (
    <div style={style}>
      {props.children}
    </div>
  );
}

let style2 = {
  height: `${width + unit}`,
  width: `${width + unit}`,
  position: "relative",
  transitionProperty: "width",
  transitionDuration: ".5s",
  transitionTimingFunction: "ease-in-out",
  display:"flex",
};

class ProjectLink extends Component {
  constructor(props){
    super(props);
    this.style = style2;
    this._id = this.props._id;
  }

  render(){
    const width = this.props.getWidth(this._id) || "5vw";
    let _style = {};
    for(const key in this.style)
      _style[key] = this.style[key];
    _style.width = width;
    return (
      <div onMouseEnter={()=>this.props.changeBG(this.props.img)}
           style={_style}>
          <ProjectIcon onMouseEnter={()=>{this.props.updateWidth(this._id, "10vw")}}>
          </ProjectIcon>
          <ProjectText style={{backgroundColor: `${this.props.color}`}}></ProjectText>
    </div>
    );
  }
}

const ProjectIcon = styled.div`
  width: ${width + unit};
  height: ${width + unit};
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100vh;
  background-color: orange;
`;

const ProjectText = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${width / 2 + unit};
`;

function Test(props){
  let a = [];
  for(let i = 0; i < numOfElemes; i++){
    a.push(
      <ProjectLink  _id={i + "oof"}
                    key={i} 
                    color={colors[i]}
                    changeBG={props.changeBG}
                    getWidth={props.getWidth}
                    updateWidth={props.updateWidth}
                    img={images[i % images.length]}>
      </ProjectLink>
    );
  }
  return (a);
}

function Proj(props){
  return (
    <ProjectBar><Test changeBG={props.changeBG}
                      getWidth={props.getWidth}
                      updateWidth={props.updateWidth}
    >
    </Test></ProjectBar>
  );
}

export default Proj;