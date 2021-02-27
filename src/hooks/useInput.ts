import {useEffect} from "react";

let velX = 0;
let velY = 0;
let zoom = 0;
let zoomTarget = 0;
let isPanning = false;

export function useInput() {
  let mouseX: number = null;
  let mouseY: number = null;
  let prevMouseX: number = null;
  let prevMouseY: number = null;

  const tickEvent = new CustomEvent("tick");
  function tick() {
    if (isPanning && prevMouseX !== null && prevMouseY !== null) {
      velX = mouseX - prevMouseX;
      velY = mouseY - prevMouseY;
    } else {
      velX *= 0.9;
      velY *= 0.9;
    }

    if (Math.abs(zoom - zoomTarget) > 0.01) {
      zoom += (zoomTarget - zoom) * 0.3;
    }

    prevMouseX = mouseX;
    prevMouseY = mouseY;

    window.dispatchEvent(tickEvent);
    requestAnimationFrame(tick);
  }
  tick();

  function handleMouseDown() {
    isPanning = true;
  }
  window.addEventListener("mousedown", handleMouseDown);

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  window.addEventListener("mousemove", handleMouseMove);

  function handleMouseUp() {
    isPanning = false;
    prevMouseX = null;
    prevMouseY = null;
  }
  window.addEventListener("mouseup", handleMouseUp);

  function handleWheel(e: WheelEvent) {
    zoomTarget -= e.deltaY / 100;
  }
  window.addEventListener("wheel", handleWheel);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  });

  return () => [velX, velY, zoom];
}
