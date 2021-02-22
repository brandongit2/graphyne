import {useEffect} from "react";

let velX = 0;
let velY = 0;
let zoom = 0;

export function useInput() {
  let tickFrame: number;

  useEffect(() => {
    function tick() {
      // Slow down pan velocity
      velX *= 0.9;
      velY *= 0.9;

      tickFrame = requestAnimationFrame(tick);
    }
    tickFrame = requestAnimationFrame(tick);

    let prevMouseX: number = null;
    let prevMouseY: number = null;
    function handleMouseMove(e: MouseEvent) {
      if (e.buttons !== 1) return;

      if (prevMouseX !== null && prevMouseY !== null) {
        velX = e.clientX - prevMouseX;
        velY = e.clientY - prevMouseY;
      }
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
    window.addEventListener("mousemove", handleMouseMove);

    function handleMouseUp() {
      prevMouseX = null;
      prevMouseY = null;
    }
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(tickFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return () => [velX, velY, zoom];
}
