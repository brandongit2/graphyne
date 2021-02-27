import {drawLine, floorToNearest, ceilToNearest} from "graphy/util";

export interface GridData {
  center: number[];
  width: number;
  height: number;
  pxPerUnit: number;
  gridRes: number;
  d: number;
}

export function drawGrid(
  c: CanvasRenderingContext2D,
  {center, width, height, pxPerUnit, gridRes, d}: GridData
) {
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
