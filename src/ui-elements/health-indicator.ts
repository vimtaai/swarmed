import { UIElement } from "../types/renderable/ui-element";
import { Point } from "../classes/point";

import { state } from "../state";
import { percentageToColor } from "../utils/color";

export class HealthIndicator extends UIElement {
  public render() {
    const indicatorHeight = 20;
    const indicatorMaxWidth = 500;
    const indicatorWidth = indicatorMaxWidth * state.player.percentHealth;
    const indicatorCoords = Point.fromPercentage(50, 93).shiftX(-indicatorWidth / 2);
    const numberCoords = Point.fromPercentage(50, 93).shiftY(indicatorHeight / 2);

    this.layer.setFill(percentageToColor(state.player.percentHealth));
    this.layer.drawRect(indicatorCoords, indicatorWidth, indicatorHeight);
    this.layer.setFont(18, "#000000");
    this.layer.drawText(numberCoords, state.player.health.toString());
  }
}
