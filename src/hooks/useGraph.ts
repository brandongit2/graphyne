import {MutableRefObject, useEffect} from "react";

import {useInput} from "./useInput";

let center = [0, 0]; // Position of center of screen.
let zoomFac = 1;
let width = 1024; // Temporary; will be set later.
let height = 1024; // Temporary; will be set later.
const pxPerUnit = 100;
let d = 1; // devicePixelRatio

export function useGraph(canvas: MutableRefObject<HTMLCanvasElement>) {
  const getVelocity = useInput();
  useEffect(() => {
    if (!canvas.current) return;

    // Convert a grid x-coordinate to a pixel x-coordinate.
    function x(val: number) {
      return Math.floor(width / 2 - (val - center[0]) * zoomFac * pxPerUnit);
    }

    // Convert a grid y-coordinate to a pixel y-coordinate.
    function y(val: number) {
      return Math.floor(height / 2 - (val - center[1]) * zoomFac * pxPerUnit);
    }

    // Inverse of x().
    function xi(px: number) {
      return (px - width / 2) / zoomFac / pxPerUnit + center[0];
    }

    // Inverse of y().
    function yi(px: number) {
      return (height / 2 - px) / zoomFac / pxPerUnit + center[1];
    }

    function drawGrid(c: CanvasRenderingContext2D) {
      // Vertical lines
      for (let i = Math.floor(xi(0)); i < Math.ceil(xi(width)); i++) {
        c.lineWidth = (i % 5 === 0 ? 2 : 1) * d;
        c.strokeStyle = i % 5 === 0 ? "#444" : "#888";
        c.beginPath();
        c.moveTo(x(i), 0);
        c.lineTo(x(i), height);
        c.stroke();
      }

      // Horizontal lines
      for (let i = Math.floor(yi(height)); i < Math.ceil(yi(0)); i++) {
        c.lineWidth = (i % 5 === 0 ? 2 : 1) * d;
        c.strokeStyle = i % 5 === 0 ? "#444" : "#888";
        c.beginPath();
        c.moveTo(0, y(i));
        c.lineTo(width, y(i));
        c.stroke();
      }
    }

    d = devicePixelRatio;
    calculateDims();

    function calculateDims() {
      width = canvas.current.getBoundingClientRect().width * d;
      height = canvas.current.getBoundingClientRect().height * d;
      canvas.current.width = width;
      canvas.current.height = height;
    }
    window.addEventListener("resize", calculateDims);

    const c = canvas.current.getContext("2d");

    function handleTick() {
      const [velX, velY, newZoom] = getVelocity();

      center = [
        center[0] + (velX / pxPerUnit / zoomFac) * d,
        center[1] + (velY / pxPerUnit / zoomFac) * d,
      ];
      zoomFac = 1.6 ** newZoom;

      c.clearRect(0, 0, width, height);
      drawGrid(c);
    }
    window.addEventListener("tick", handleTick);

    return () => {
      window.removeEventListener("resize", calculateDims);
      window.removeEventListener("resize", calculateDims);
      window.removeEventListener("tick", handleTick);
    };
  }, [canvas]);
}
