export function percentageToColor(percentage: number, maxHue: number = 120, minHue: number = 0) {
  const hue = percentage * (maxHue - minHue) + minHue;
  return `hsl(${hue}, 100%, 60%)`;
}
