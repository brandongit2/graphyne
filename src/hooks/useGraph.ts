import {MutableRefObject, useEffect} from "react";

import {drawAxisLabels, drawGraph, drawGrid, setGridData} from "graphy/drawing";
import {useInput} from "./useInput";

let center = [0, 0]; // Position of center of screen.
let width = 1024; // Temporary; will be set later.
let height = 1024; // Temporary; will be set later.
let pxPerUnit = 100;
let gridRes = 1;
let d = 1; // devicePixelRatio

export function useGraph(
  canvas: MutableRefObject<HTMLCanvasElement>,
  functions: string[]
) {
  const getInput = useInput();
  useEffect(() => {
    if (!canvas.current) return;

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
      const {velX, velY, zoom: newZoom, zoomPos} = getInput();

      // Zoom about cursor position.
      center = [
        center[0] - (zoomPos[0] - width / 2) / pxPerUnit,
        center[1] - (zoomPos[1] - height / 2) / pxPerUnit,
      ];
      pxPerUnit = 100 * 1.5 ** newZoom;
      center = [
        center[0] + (zoomPos[0] - width / 2) / pxPerUnit,
        center[1] + (zoomPos[1] - height / 2) / pxPerUnit,
      ];

      // Translate center point.
      center = [center[0] + velX / pxPerUnit, center[1] + velY / pxPerUnit];

      if (pxPerUnit * gridRes < 30) {
        gridRes *= 10;
      } else if (pxPerUnit * gridRes > 300) {
        gridRes /= 10;
      }

      c.clearRect(0, 0, width, height);
      setGridData({c, center, width, height, pxPerUnit, gridRes, d});
      drawGrid();
      drawAxisLabels();
      console.log(functions);
      functions.forEach((func) => {
        drawGraph(func);
      });
    }
    window.addEventListener("tick", handleTick);

    return () => {
      window.removeEventListener("resize", calculateDims);
      window.removeEventListener("resize", calculateDims);
      window.removeEventListener("tick", handleTick);
    };
  }, [canvas]);
}
