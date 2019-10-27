export const ColorPalette = {
  PRIMARY: "#55aa33",
  PRIMARY_DARK: "#338811"
};

export function percentageToColor(percentage: number, maxHue: number = 120, minHue: number = 0) {
  const hue = percentage * (maxHue - minHue) + minHue;
  return `hsl(${hue}, 100%, 60%)`;
}
