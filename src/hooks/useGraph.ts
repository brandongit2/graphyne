import {MutableRefObject, useEffect} from "react";

import {useInput} from "./useInput";

let xmin = -10;
let xmax = 10;
let ymin = -10;
let ymax = 10;
let width = 1024; // Temporary; will be set later
let height = 1024; // Temporary; will be set later
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

    d = window.devicePixelRatio;
    width = canvas.current.getBoundingClientRect().width * d;
    height = canvas.current.getBoundingClientRect().height * d;
    canvas.current.width = width;
    canvas.current.height = height;

    // Recalculate y bounds to get proper graph aspect ratio
    const ratio = width / height;
    const newYRange = (xmax - xmin) / ratio;
    ymin = -newYRange / 2;
    ymax = newYRange / 2;

    const c = canvas.current.getContext("2d");

    drawGrid(c);
    let anim: number;
    function frame() {
      const [velX, velY] = getVelocity();
      xmin -= velX / 100;
      xmax -= velX / 100;
      ymin += velY / 100;
      ymax += velY / 100;
      c.clearRect(0, 0, width, height);
      drawGrid(c);

      anim = requestAnimationFrame(frame);
    }
    anim = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(anim);
    };
  }, [canvas]);
}
