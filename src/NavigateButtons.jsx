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
  node.onmouseover = null;
  node.onmouseout = null;
  node.style.cursor = "not-allowed";
  node.style.opacity = 0.5;
  scaleNode(node, 1);
};

const NavigateButtons = (props) => {
  const [isEnabled, setEnable] = useState(true);
  const navContainerRef = useRef(null);
  useEffect(() => {
    const [leftButton, rightButton] = [...navContainerRef.current.children];
    enable(leftButton);
    enable(rightButton);
    if (props.index === 0) disable(leftButton);
    else if (props.index === props.numOfItems - 1) disable(rightButton);
  }, [props.index, props.numOfItems]);
  return (
    <div
      ref={navContainerRef}
      className={
        "grid grid-cols-2 grid-rows-1 gap-2 h-12 w-24" + props.className
      }
      style={props.style}
    >
      <Button
        gridPos="col-start-1 col-end-2"
        onclick={() => {
          if (props.index > 0 && isEnabled)
            props.updateState(props.index - 1, props.setIndex, setEnable);
        }}
        direction="left"
      />
      <Button
        gridPos="col-start-2 col-end-3"
        onclick={() => {
          if (props.index < props.numOfItems - 1 && isEnabled)
            props.updateState(props.index + 1, props.setIndex, setEnable);
        }}
      />
    </div>
  );
};

const Button = (props) => {
  return (
    <div
      className={
        "rounded-full h-10 w-10 flex items-center justify-center" +
        props.gridPos
      }
      onClick={props.onclick}
      style={{
        background: "rgba(255, 255, 255, .5)",
        transition: "all .2s ease-in-out",
      }}
    >
      <Arrow direction={props.direction} />
    </div>
  );
};

export default NavigateButtons;
