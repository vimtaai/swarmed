import { percentageToColor } from "../../utils/color";

import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { state } from "../../state";

export class HealthIndicator extends UIElement {
  public static coords = Point.fromPercentage(1, 91);
  public static width = 200;
  public static height = 55;

  public render(layer: Layer) {
    const barHeight = 20;
    const barMaxWidth = HealthIndicator.width - 10;
    const healthBarCoords = HealthIndicator.coords.shiftXY(5, 5);
    const healthIndicatorWidth = barMaxWidth * state.localPlayer.percentHealth;

    layer.setStroke("#000000", 2);

    layer.setFill(state.localPlayer.primaryColor);
    layer.drawRect(HealthIndicator.coords, HealthIndicator.width, HealthIndicator.height);

    layer.setFill(percentageToColor(state.localPlayer.percentHealth));
    layer.drawRect(healthBarCoords, healthIndicatorWidth, barHeight);
    layer.setFont(18, "#000000", "left");
    layer.drawText(healthBarCoords.shiftXY(1, barHeight / 2), state.localPlayer.health.toString());

    if (state.localPlayer.shield > 0) {
      const shieldBarOffset = barHeight + 5;
      const shieldBarCoords = healthBarCoords.shiftY(shieldBarOffset);
      const shieldIndicatorWidth = barMaxWidth * state.localPlayer.percentShield;

      layer.setFill(percentageToColor(state.localPlayer.percentShield, 240, 120));
      layer.drawRect(shieldBarCoords, shieldIndicatorWidth, barHeight);
      layer.setFont(18, "#000000", "left");
      layer.drawText(shieldBarCoords.shiftXY(1, barHeight / 2), state.localPlayer.shield.toString());
    }
  }
}
