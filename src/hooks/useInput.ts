import {useEffect} from "react";

let velX = 0;
let velY = 0;

export function useInput() {
  let prevMouseX: number = null;
  let prevMouseY: number = null;
  function handleMouseDown(e: MouseEvent) {
    if (prevMouseX !== null && prevMouseY !== null) {
      velX = e.clientX - prevMouseX;
      velY = e.clientY - prevMouseY;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
  }
  window.addEventListener("mousedown", handleMouseDown);

  // return () => {
  //   window.removeEventListener("mousedown", handleMouseDown);
  // };

  return () => [velX, velY];
}
