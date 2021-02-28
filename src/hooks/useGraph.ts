import {MutableRefObject, useEffect} from "react";

import {drawAxisLabels, drawGrid, setGridData} from "graphy/drawing";
import {useInput} from "./useInput";

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

      if (pxPerUnit * gridRes < 30) {
        gridRes *= 10;
      } else if (pxPerUnit * gridRes > 300) {
        gridRes /= 10;
      }

      c.clearRect(0, 0, width, height);
      setGridData({center, width, height, pxPerUnit, gridRes, d});
      drawGrid(c);
      drawAxisLabels(c);
    }
    window.addEventListener("tick", handleTick);

    return () => {
      window.removeEventListener("resize", calculateDims);
      window.removeEventListener("resize", calculateDims);
      window.removeEventListener("tick", handleTick);
    };
  }, [canvas]);
}
