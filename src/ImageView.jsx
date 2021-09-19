import React, { useState, useRef } from "react";
import "./style/image-view.css";
import NavButtons from "./NavigateButtons";
import Carousel from "./Carousel";
import { CAROUSEL, PROJECT_DESC, pageState } from "./PageState";
const CAROUSEL_VIEW = false,
  DEFAULT_VIEW = true;

const translate = (e, d) => e && (e.style.left = d + "px");
const isMouseEvent = (event) => /[Mm]ouse/i.test(event.type);
const getEvent = (event) => (isMouseEvent(event) ? event : event.touches[0]);
const ImageView = ({ images }) => {
  const [view, setView] = useState(DEFAULT_VIEW);
  const imageRefs = useRef(images.map(() => React.createRef()));
  const [index, setIndex] = useState(0);
  const [isTransitioning, setTransition] = useState(false);
  const [start, setStart] = useState(undefined);
  const [delta, setDelta] = useState(undefined);
  const [startSwiping, setStartSwiping] = useState(false);
  const w = window.innerWidth || document.documentElement.clientWidth;
  const len = images.length;
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
    if (newIndex > currIndex) currNode.style.left = "-100%";
    else currNode.style.left = "100%";
    nextNode.style.left = "0";
  };

  const startSwipe = (event) => {
    if (isTransitioning) return;
    const { pageX, pageY } = getEvent(event);
    setStart({ x: pageX, y: pageY, t: +new Date() });
    setStartSwiping(true);
  };

  const moveSwipe = (event) => {
    if (!start) return;
    if (!isMouseEvent(event))
      if (event.touches.length > 1 || (event.scale && event.scale !== 1))
        return;
    const evt = getEvent(event);
    const { pageX, pageY } = evt;
    const d = { x: pageX - start.x, y: pageY - start.y };
    setDelta(d);
    const refs = imageRefs.current;
    const l = index ? refs[index - 1].current : undefined;
    const m = refs[index].current;
    const r = index !== len - 1 ? refs[index + 1].current : undefined;
    refs.forEach((ref) => (ref.current.style.transitionDuration = "0ms"));
    [l, m, r].forEach((e, i) => translate(e, [-w, 0, w][i] + d.x));
  };

  const endSwipe = () => {
    if (!start) return;
    if (!delta) {
      setStartSwiping(false);
      setView(DEFAULT_VIEW);
      pageState.state = PROJECT_DESC;
      setStart(undefined);
      return;
    }
    const refs = imageRefs.current;
    refs.forEach((ref) => (ref.current.style.transitionDuration = ".6s"));
    const duration = +new Date() - start.t;
    const absX = Math.abs(delta.x);
    const isValidSwipe = (duration < 250 && absX > 20) || absX > w / 2;
    const l = index ? refs[index - 1].current : undefined;
    const m = refs[index].current;
    const r = index !== len - 1 ? refs[index + 1].current : undefined;
    setTimeout(() => setStartSwiping(false), 600);
    if (isValidSwipe) {
      const direction = absX / delta.x;
      const pos =
        direction < 0
          ? [2 * -w, (index !== len - 1) * -w, 0]
          : [0, (index !== 0) * w, 2 * w];
      [l, m, r].forEach((elem, i) => translate(elem, pos[i]));
      let newCurr;
      if (direction < 0) newCurr = r ? index + 1 : index;
      else newCurr = l ? index - 1 : index;
      setIndex(newCurr);
    } else [l, m, r].forEach((elem, i) => translate(elem, [-w, 0, w][i]));
    setDelta(undefined);
    setStart(undefined);
  };

  return (
    <>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative img-view-container w-64 h-64"
          onClick={() => {
            imageRefs.current.forEach(
              (ref, i) => (ref.current.style.left = `${(i - index) * 100}%`)
            );
            setView(CAROUSEL_VIEW);
            setIndex(index);
            pageState.state = CAROUSEL;
          }}
        >
          <div
            className="img-view"
            alt={image.alt}
            style={{
              backgroundImage: `url(${image.src})`,
            }}
          ></div>
          <div className="absolute left-0 top-0 w-full h-full">
            <span>View</span>
            <span>Image</span>
          </div>
        </div>
      ))}
      <div
        className="fixed left-0 top-0 w-full h-full carousel-container"
        style={{
          zIndex: view === CAROUSEL_VIEW ? 1 : -10,
          opacity: view === CAROUSEL_VIEW ? 1 : 0,
        }}
      >
        <Carousel
          startSwipe={startSwipe}
          moveSwipe={moveSwipe}
          endSwipe={endSwipe}
          images={images}
          imageRefs={imageRefs.current}
        />
        <NavButtons
          startSwiping={startSwiping}
          isTransitioning={isTransitioning}
          setTransition={setTransition}
          index={index}
          setIndex={setIndex}
          className="carousel-nav absolute"
          numOfItems={len}
          updateState={nextImage}
          style={{ bottom: "2vh" }}
        />
      </div>
    </>
  );
};

export default ImageView;
