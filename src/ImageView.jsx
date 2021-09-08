import React, { useState, useRef } from "react";
import "./image-view.css";
import NavButtons from "./NavigateButtons";
import Carousel from "./Carousel";

const CAROUSEL_VIEW = false,
  DEFAULT_VIEW = true;

const ImageView = (props) => {
  const [view, setView] = useState(DEFAULT_VIEW);
  const imageRefs = useRef([]);
  imageRefs.current = props.images.map(() => React.createRef());
  const [index, setIndex] = useState(0);

  const nextImage = (newIndex, setIndex, setEnable) => {
    setEnable(false);
    const currIndex = index;
    const currNode = imageRefs.current[currIndex].current;
    const nextNode = imageRefs.current[newIndex].current;
    currNode.ontransitionend = () => {
      setIndex(newIndex);
      setEnable(true);
      currNode.ontransitionend = null;
    };
    if (newIndex > currIndex) {
      currNode.style.left = "-100%";
      nextNode.style.left = "0";
    } else {
      currNode.style.left = "100%";
      nextNode.style.left = "0";
    }
  };

  return (
    <>
      {props.images.map((image, index) => {
        return (
          <div
            key={index}
            className="relative img-view-container w-64 h-64"
            onClick={() => {
              imageRefs.current.forEach((ref, i) => {
                const left = i < index ? "-100%" : i === index ? "0" : "100%";
                ref.current.style.left = left;
              });
              setView(CAROUSEL_VIEW);
              setIndex(index);
            }}
          >
            <img key={index} alt={image.alt} src={image.src} />
            <div className="absolute left-0 top-0 w-full h-full">
              <span>View</span>
              <span>Image</span>
            </div>
          </div>
        );
      })}
      <div
        className="fixed left-0 top-0 w-full h-full carousel-container"
        style={{
          zIndex: view === CAROUSEL_VIEW ? 1 : -10,
          opacity: view === CAROUSEL_VIEW ? 1 : 0,
        }}
      >
        <Carousel
          images={props.images}
          imageRefs={imageRefs.current}
          onClick={(e) => {
            if (e.target.classList.contains("image-container"))
              setView(DEFAULT_VIEW);
          }}
        />
        <NavButtons
          index={index}
          setIndex={setIndex}
          className="carousel-nav absolute"
          numOfItems={props.images.length}
          updateState={nextImage}
          style={{ bottom: "2vh" }}
        />
      </div>
    </>
  );
};

export default ImageView;
