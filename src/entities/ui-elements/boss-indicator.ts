import { percentageToColor } from "../../utils/color";

import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { state } from "../../state";

export class BossIndicator extends UIElement {
  public render(layer: Layer) {
    let offsetIndex = 0;

    state.bosses.forEach(boss => {
      const indicatorHeight = 20;
      const indicatorMaxWidth = 500;
      const healthIndicatorCenter = Point.fromPercentage(50, 3).shiftY(indicatorHeight * 2 * offsetIndex);
      const healthIndicatorWidth = indicatorMaxWidth * boss.percentHealth;
      const healthIndicatorCoords = healthIndicatorCenter.shiftX(-healthIndicatorWidth / 2);
      const healthNumberCoords = healthIndicatorCenter.shiftY(indicatorHeight / 2);

      layer.setFill(percentageToColor(boss.percentHealth, 0, 120));
      layer.drawRect(healthIndicatorCoords, healthIndicatorWidth, indicatorHeight);
      layer.setFont(18, "#000000");
      layer.drawText(healthNumberCoords, boss.health.toString());
      layer.setFont(30, percentageToColor(boss.percentHealth, 0, 120));
      layer.drawTextWithOutline(healthNumberCoords.shiftY(indicatorHeight * 2), boss.name.toString());

      offsetIndex++;
    });
  }
}
