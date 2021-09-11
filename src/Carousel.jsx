import React from "react";

const Carousel = (props) => {
  return (
    <div className="absolute w-full h-full overflow-hidden">
      {props.images.map((image, index) => (
        <div
          key={index}
          className="image-container absolute w-full h-full flex items-center justify-center"
          onClick={props.onClick}
          ref={props.imageRefs[index]}
          style={{ transition: "left .3s linear, right .3s linear" }}
        >
          <img
            style={{ height: "70%" }}
            className="carousel-image"
            alt={image.alt}
            src={image.src}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
