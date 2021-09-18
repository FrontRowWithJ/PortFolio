import React from "react";

const Carousel = (props) => {
  const { startSwipe, moveSwipe, endSwipe, images, imageRefs } = props;
  return (
    <div
      className="absolute w-full h-full overflow-hidden"
      onMouseDown={startSwipe}
      onMouseMove={moveSwipe}
      onMouseUp={endSwipe}
      onTouchStart={startSwipe}
      onTouchMove={moveSwipe}
      onTouchEnd={endSwipe}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="image-container absolute w-full h-full flex items-center justify-center"
          ref={imageRefs[index]}
          style={{ transition: "left .6s cubic-bezier(0.83, 0, 0.17, 1)" }}
        >
          <img
            draggable={false}
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
