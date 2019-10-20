import { percentageToColor } from "../utils/color";
import { Point } from "../classes/point";
import { UIElement } from "../types/renderable/ui-element";

import { state } from "../state";

export class BossIndicator extends UIElement {
  public render() {
    if (!state.boss) {
      return;
    }

    const indicatorHeight = 20;
    const indicatorMaxWidth = 500;
    const healthIndicatorCenter = Point.fromPercentage(50, 3);
    const healthIndicatorWidth = indicatorMaxWidth * state.boss.percentHealth;
    const healthIndicatorCoords = healthIndicatorCenter.shiftX(-healthIndicatorWidth / 2);
    const healthNumberCoords = healthIndicatorCenter.shiftY(indicatorHeight / 2);

    this.layer.setFill(percentageToColor(state.boss.percentHealth, 0, 120));
    this.layer.drawRect(healthIndicatorCoords, healthIndicatorWidth, indicatorHeight);
    this.layer.setFont(18, "#000000");
    this.layer.drawText(healthNumberCoords, state.boss.health.toString());
    this.layer.setFont(30, percentageToColor(state.boss.percentHealth, 0, 120));
    this.layer.drawTextWithOutline(healthNumberCoords.shiftY(indicatorHeight * 2), state.boss.name.toString());
  }
}
