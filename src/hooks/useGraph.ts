import {MutableRefObject, useEffect} from "react";

import {useInput} from "./useInput";
import {drawLine, floorToNearest, ceilToNearest} from "graphy/util";

let center = [0, 0]; // Position of center of screen.
let width = 1024; // Temporary; will be set later.
let height = 1024; // Temporary; will be set later.
let pxPerUnit = 100;
let gridRes = 1;
let d = 1; // devicePixelRatio

export function useGraph(canvas: MutableRefObject<HTMLCanvasElement>) {
  const getVelocity = useInput();
  useEffect(() => {
    if (!canvas.current) return;

    // Convert a grid x-coordinate to a pixel x-coordinate.
    function x(val: number) {
      return Math.floor(width / 2 - (val - center[0]) * pxPerUnit);
    }

    // Convert a grid y-coordinate to a pixel y-coordinate.
    function y(val: number) {
      return Math.floor(height / 2 - (val - center[1]) * pxPerUnit);
    }

    // Inverse of x().
    function xi(px: number) {
      return (px - width / 2) / pxPerUnit + center[0];
    }

    // Inverse of y().
    function yi(px: number) {
      return (height / 2 - px) / pxPerUnit + center[1];
    }

    function drawGrid(c: CanvasRenderingContext2D) {
      if (pxPerUnit * gridRes < 20) {
        gridRes *= 10;
      } else if (pxPerUnit * gridRes > 200) {
        gridRes /= 10;
      }
      const majorGridRes = 5 * gridRes;

      // Minor lines
      for (
        let i = floorToNearest(xi(0), gridRes);
        i < ceilToNearest(xi(width), gridRes);
        i += gridRes
      ) {
        drawLine(c, x(i), 0, x(i), height, "#bbb", d);
      }
      for (
        let i = floorToNearest(yi(height), gridRes);
        i < ceilToNearest(yi(0), gridRes);
        i += gridRes
      ) {
        drawLine(c, 0, y(i), width, y(i), "#bbb", d);
      }

      // Major lines
      for (
        let i = floorToNearest(xi(0), majorGridRes);
        i < ceilToNearest(xi(width), majorGridRes);
        i += majorGridRes
      ) {
        drawLine(c, x(i), 0, x(i), height, "#777", 2 * d);
      }
      for (
        let i = floorToNearest(yi(height), majorGridRes);
        i < ceilToNearest(yi(0), majorGridRes);
        i += majorGridRes
      ) {
        drawLine(c, 0, y(i), width, y(i), "#777", 2 * d);
      }

      // Axis lines
      drawLine(c, x(0), 0, x(0), height, "black", 3 * d);
      drawLine(c, 0, y(0), width, y(0), "black", 3 * d);
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
        center[0] + (velX / pxPerUnit) * d,
        center[1] + (velY / pxPerUnit) * d,
      ];
      pxPerUnit = 100 * 1.5 ** newZoom;

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
