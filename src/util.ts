export function floorToNearest(x: number, i: number) {
  return Math.floor(x / i) * i;
}

export function ceilToNearest(x: number, i: number) {
  return Math.ceil(x / i) * i;
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
