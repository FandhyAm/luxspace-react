import React, { useRef, useState, useCallback, useLayoutEffect } from "react";

export default function Carousel({ children, refContainer }) {
  const refDragHandler = useRef(null);
  const [first, setfirst] = useState(0);

  const threshold = 100;
  const itemToShow = window.innerWidth < 767 ? 1 : 4;
  const DIRECTION_LEFT = "DIRECTION_LEFT";
  const DIRECTION_RIGHT = "DIRECTION_RIGHT";

  const postInitial = useRef();
  const posX1 = useRef();
  const posX2 = useRef();
  const posFinal = useRef();
  const isAllowShift = useRef(true);
  const cards = useRef();

  const onDragMove = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();
      console.log(e);

      if (e.type === "touchmove") {
        posX2.current = posX1.current - e.touches[0].clientX;
        posX1.current = e.touches[0].clientX;
      } else {
        posX2.current = posX1.current - e.clientX;
        posX1.current = e.clientX;
      }

      refDragHandler.current.style.left =
        refDragHandler.current.style.offsetLeft - posX2.current + "px";
    },
    [posX1, posX2]
  );

  const onDragEnd = useCallback((e) => {
    e = e || window.event;
    e.preventDefault();
    console.log(e);
  }, []);

  const onDragStart = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();
      console.log(e);

      postInitial.current = refDragHandler.current.offsetLeft;

      if (e.type === "touchstart") {
        posX1.current = e.touches[0].clientX;
      } else {
        posX1.current = e.clientX;
        document.onmouseup = onDragEnd;
        document.onmousemove = onDragMove;
      }
    },
    [onDragEnd, onDragMove]
  );

  useLayoutEffect(() => {
    const refForwardDragHandler = refDragHandler.current;

    refForwardDragHandler.onmousedown = onDragStart;

    refForwardDragHandler.addEventListener("touchstart", onDragStart);
    refForwardDragHandler.addEventListener("touchmove", onDragEnd);
    refForwardDragHandler.addEventListener("touchstart", onDragMove);
    return () => {
      refForwardDragHandler.removeEventListener("touchstart", onDragStart);
      refForwardDragHandler.removeEventListener("touchmove", onDragEnd);
      refForwardDragHandler.removeEventListener("touchstart", onDragMove);
    };
  }, [onDragStart, onDragEnd, onDragMove]);

  return (
    <div className="flex -mx-4 flex-row" ref={refDragHandler}>
      {children}
    </div>
  );
}
