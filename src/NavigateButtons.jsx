import React, { useState, useEffect, useRef } from "react";
import Arrow from "./Arrow";

const scaleNode = (node, scale) => {
  node.style.transform = `scale(${scale})`;
};

const enable = (node) => {
  node.onmouseover = () => scaleNode(node, 1.2);
  node.onmouseout = () => scaleNode(node, 1);
  node.style.cursor = "pointer";
  node.style.opacity = 1;
};

const disable = (node) => {
  node.onmouseover = node.onmouseout = null;
  node.style.cursor = "not-allowed";
  node.style.opacity = 0.5;
  scaleNode(node, 1);
};

const NavigateButtons = (props) => {
  const { index, numOfItems, setIndex, updateState, style, className } = props;
  const [isEnabled, setEnable] = useState(true);
  const navContainerRef = useRef(null);
  useEffect(() => {
    const [leftButton, rightButton] = [...navContainerRef.current.children];
    enable(leftButton);
    enable(rightButton);
    if (index === 0) disable(leftButton);
    else if (index === numOfItems - 1) disable(rightButton);
  }, [index, numOfItems]);
  return (
    <div
      ref={navContainerRef}
      className={`grid grid-cols-2 grid-rows-1 gap-2 h-12 w-24 ${className}`}
      style={style}
    >
      <Button
        gridPos="col-start-1 col-end-2"
        direction="left"
        onClick={() => {
          if (
            index > 0 &&
            isEnabled &&
            !props.startSwiping &&
            !props.isTransitioning
          ) {
            props.setTransition(true);
            updateState(index - 1, setIndex, setEnable);
            setTimeout(() => props.setTransition(false), 600);
          }
        }}
      />
      <Button
        gridPos="col-start-2 col-end-3"
        onClick={() => {
          if (
            index < numOfItems - 1 &&
            isEnabled &&
            !props.startSwiping &&
            !props.isTransitioning
          ) {
            props.setTransition(true);
            updateState(index + 1, setIndex, setEnable);
            setTimeout(() => props.setTransition(false), 600);
          }
        }}
      />
    </div>
  );
};

const Button = ({ gridPos, onClick, direction }) => {
  return (
    <div
      className={`rounded-full h-10 w-10 flex items-center justify-center${gridPos}`}
      onClick={onClick}
      style={{
        background: "rgba(255, 255, 255, .5)",
        transition: "all .2s ease-in-out",
      }}
    >
      <Arrow direction={direction} />
    </div>
  );
};

export default NavigateButtons;
