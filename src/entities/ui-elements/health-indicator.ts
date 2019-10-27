import { percentageToColor } from "../../utils/color";

import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { state } from "../../state";

export class HealthIndicator extends UIElement {
  public render(layer: Layer) {
    const indicatorHeight = 20;
    const indicatorMaxWidth = 500;
    const healthIndicatorCenter = Point.fromPercentage(50, 93);
    const healthIndicatorWidth = indicatorMaxWidth * state.player.percentHealth;
    const healthIndicatorCoords = healthIndicatorCenter.shiftX(-healthIndicatorWidth / 2);
    const healthNumberCoords = healthIndicatorCenter.shiftY(indicatorHeight / 2);

    layer.setStroke("#000000", 2);
    layer.setFill(percentageToColor(state.player.percentHealth));
    layer.drawRect(healthIndicatorCoords, healthIndicatorWidth, indicatorHeight);
    layer.setFont(18, "#000000");
    layer.drawText(healthNumberCoords, state.player.health.toString());

    if (state.player.shield > 0) {
      const shieldIndicatorCenter = Point.fromPercentage(50, 93).shiftY(-indicatorHeight * 2);
      const shieldIndicatorWidth = indicatorMaxWidth * state.player.percentShield;
      const shieldIndicatorCoords = shieldIndicatorCenter.shiftX(-shieldIndicatorWidth / 2);
      const shieldNumberCoords = shieldIndicatorCenter.shiftY(indicatorHeight / 2);

      layer.setFill(percentageToColor(state.player.percentShield, 240, 120));
      layer.drawRect(shieldIndicatorCoords, shieldIndicatorWidth, indicatorHeight);
      layer.setFont(18, "#000000");
      layer.drawText(shieldNumberCoords, state.player.shield.toString());
    }
  }
}
