import { Point } from "../classes/point";
import { UIElement } from "../types/renderable/ui-element";

import { state } from "../state";

export class ReloadIndicator extends UIElement {
  public render() {
    if (state.player.weapon.isReloading) {
      const indicatorHeight = 15;
      const indicatorMaxWidth = 200;
      const indicatorWidth = indicatorMaxWidth * state.player.weapon.reloadProgress;
      const indicatorCoords = Point.fromPercentage(50, 80).shiftX(-indicatorWidth / 2);

      this.layer.setFont(20, "#ff0000");
      this.layer.drawTextWithOutline(Point.fromPercentage(50, 85), "RELOADING");
      this.layer.setFill("#ff0000");
      this.layer.drawRect(indicatorCoords, indicatorWidth, indicatorHeight);
    }
  }
}
