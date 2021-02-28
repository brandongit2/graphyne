export function roundToNearest(x: number, i: number) {
  return Math.round(x / i) * i;
}

export function floorToNearest(x: number, i: number) {
  return Math.floor(x / i) * i;
}

export function ceilToNearest(x: number, i: number) {
  return Math.ceil(x / i) * i;
}
