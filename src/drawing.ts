import {
  floorToNearest,
  ceilToNearest,
  roundToNearest,
  formatNumber,
} from "graphy/util";

export interface GridData {
  center: number[];
  width: number;
  height: number;
  pxPerUnit: number;
  gridRes: number;
  d: number;
}
let gridData: GridData;
export function setGridData(data: GridData) {
  gridData = data;
}

// Convert a grid x-coordinate to a pixel x-coordinate.
function x(val: number) {
  const {width, center, pxPerUnit} = gridData;
  return Math.floor(width / 2 - (val - center[0]) * pxPerUnit);
}

// Convert a grid y-coordinate to a pixel y-coordinate.
function y(val: number) {
  const {height, center, pxPerUnit} = gridData;
  return Math.floor(height / 2 - (val - center[1]) * pxPerUnit);
}

// Inverse of x().
function xi(px: number) {
  const {width, center, pxPerUnit} = gridData;
  return (px - width / 2) / pxPerUnit + center[0];
}

// Inverse of y().
function yi(px: number) {
  const {height, center, pxPerUnit} = gridData;
  return (height / 2 - px) / pxPerUnit + center[1];
}

export function drawGrid(c: CanvasRenderingContext2D) {
  const {width, height, gridRes, d} = gridData;

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

export function drawAxisLabels(c: CanvasRenderingContext2D) {
  const {width, height, gridRes, d} = gridData;

  console.log(gridRes);
  for (
    let i = floorToNearest(xi(0), gridRes);
    i < ceilToNearest(xi(width), gridRes);
    i += gridRes
  ) {
    if (Math.abs(i / gridRes) < 0.0001) continue;
    drawText(
      c,
      formatNumber(i),
      x(i),
      y(0) + 16 * d,
      `${14 * d}px black`,
      "center",
      undefined,
      {
        width: 4 * d,
        color: "white",
      }
    );
  }

  for (
    let i = floorToNearest(yi(height), gridRes);
    i < ceilToNearest(yi(0), gridRes);
    i += gridRes
  ) {
    if (Math.abs(i / gridRes) < 0.0001) continue;
    drawText(
      c,
      formatNumber(i),
      x(0) - 6 * d,
      y(i),
      `${14 * d}px black`,
      "right",
      "middle",
      {
        width: 4 * d,
        color: "white",
      }
    );
  }
}

export function drawLine(
  c: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = "black",
  width = 1
) {
  c.lineWidth = width;
  c.strokeStyle = color;
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
}

export function drawText(
  c: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  style: string,
  align?: CanvasTextAlign,
  baseline?: CanvasTextBaseline,
  stroke?: {
    width: number;
    color: string;
  }
) {
  c.font = style;
  c.textAlign = align;
  c.textBaseline = baseline;

  if (stroke) {
    c.lineWidth = stroke.width;
    c.strokeStyle = stroke.color;
    c.strokeText(text, x, y);
  }

  c.fillText(text, x, y);
}
