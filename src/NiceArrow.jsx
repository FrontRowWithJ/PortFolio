import React from "react";

const NiceArrow = (props) => {
  return (
    <svg
      className={props.className}
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="527.4 85 295 100"
      overflow="visible"
      xmlSpace="preserve"
    >
      <g
        transform={`rotate(${
          props.direction === "left" ? "180" : "0"
        } 674.9 135)`}
      >
        <path d="M768.4,183.2h-13c0-30.5,36.7-55,67-55l0,13.2C798.6,141.4,768.4,160.9,768.4,183.2z"></path>
        <path d="M822.4,141.2c-30.3,0-67-24.5-67-55h13c0,22.2,30.2,41.8,54,41.8V141.2z"></path>
        <rect id="arrow-rect" x="527.4" y="128" width="100%" height="13.4"></rect>
      </g>
    </svg>
  );
};

export default NiceArrow;
