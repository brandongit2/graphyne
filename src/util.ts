export function roundToNearest(x: number, i: number) {
  return Math.round(x / i) * i;
}

export function floorToNearest(x: number, i: number) {
  return Math.floor(x / i) * i;
}

export function ceilToNearest(x: number, i: number) {
  return Math.ceil(x / i) * i;
}

export function formatNumber(n: number) {
  if (Math.abs(Math.log10(Math.abs(n))) > 3) {
    const exp = Math.floor(Math.log10(Math.abs(n)));
    return `${n / 10 ** exp}e${exp}`;
  } else {
    return (Math.round(n * 1000) / 1000).toString();
  }
}
