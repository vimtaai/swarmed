import { percentageToColor } from "../utils/color";
import { Point } from "../classes/point";
import { UIElement } from "../types/renderable/ui-element";

import { state } from "../state";

export class HealthIndicator extends UIElement {
  public render() {
    const indicatorHeight = 20;
    const indicatorMaxWidth = 500;
    const healthIndicatorCenter = Point.fromPercentage(50, 93);
    const healthIndicatorWidth = indicatorMaxWidth * state.player.percentHealth;
    const healthIndicatorCoords = healthIndicatorCenter.shiftX(-healthIndicatorWidth / 2);
    const healthNumberCoords = healthIndicatorCenter.shiftY(indicatorHeight / 2);

    this.layer.setFill(percentageToColor(state.player.percentHealth));
    this.layer.drawRect(healthIndicatorCoords, healthIndicatorWidth, indicatorHeight);
    this.layer.setFont(18, "#000000");
    this.layer.drawText(healthNumberCoords, state.player.health.toString());

    if (state.player.shield > 0) {
      const shieldIndicatorCenter = Point.fromPercentage(50, 93).shiftY(-indicatorHeight * 2);
      const shieldIndicatorWidth = indicatorMaxWidth * state.player.percentShield;
      const shieldIndicatorCoords = shieldIndicatorCenter.shiftX(-shieldIndicatorWidth / 2);
      const shieldNumberCoords = shieldIndicatorCenter.shiftY(indicatorHeight / 2);

      this.layer.setFill(percentageToColor(state.player.percentShield, 240, 120));
      this.layer.drawRect(shieldIndicatorCoords, shieldIndicatorWidth, indicatorHeight);
      this.layer.setFont(18, "#000000");
      this.layer.drawText(shieldNumberCoords, state.player.shield.toString());
    }
  }
}
