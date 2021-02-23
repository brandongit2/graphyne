import {MutableRefObject, useEffect} from "react";

import {useInput} from "./useInput";

let xmin = -10;
let xmax = 10;
let ymin = -10;
let ymax = 10;
let width = 1024; // Temporary; will be set later
let height = 1024; // Temporary; will be set later
let pxPerUnit = 1;
let d = 1; // devicePixelRatio

export function useGraph(canvas: MutableRefObject<HTMLCanvasElement>) {
  const getVelocity = useInput();
  useEffect(() => {
    if (!canvas.current) return;

    function x(val: number) {
      return Math.floor(((val - xmin) / (xmax - xmin)) * width);
    }

    function y(val: number) {
      return Math.floor(height - ((val - ymin) / (ymax - ymin)) * height);
    }

    function drawGrid(c: CanvasRenderingContext2D) {
      // Vertical lines
      for (let i = Math.floor(xmin); i < Math.ceil(xmax); i++) {
        c.lineWidth = (i % 5 === 0 ? 2 : 1) * d;
        c.strokeStyle = i % 5 === 0 ? "#444" : "#888";

        c.beginPath();
        c.moveTo(x(i), 0);
        c.lineTo(x(i), height);
        c.stroke();
      }

      // Horizontal lines
      for (let i = Math.floor(ymin); i < Math.ceil(ymax); i++) {
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
      pxPerUnit = height / (ymax - ymin) / d;
      canvas.current.width = width;
      canvas.current.height = height;

      // Recalculate x bounds to get proper graph aspect ratio
      const ratio = width / height;
      const newXRange = (ymax - ymin) * ratio;
      xmin = -newXRange / 2;
      xmax = newXRange / 2;
    }
    window.addEventListener("resize", calculateDims);

    const c = canvas.current.getContext("2d");

    function handleTick() {
      const [velX, velY, zoom] = getVelocity();
      xmin -= velX / pxPerUnit;
      xmax -= velX / pxPerUnit;
      ymin += velY / pxPerUnit;
      ymax += velY / pxPerUnit;
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
