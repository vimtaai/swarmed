import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { state } from "../../state";

export class ReloadIndicator extends UIElement {
  public render(layer: Layer) {
    if (state.player.weapon.isReloading) {
      const indicatorHeight = 15;
      const indicatorMaxWidth = 200;
      const indicatorWidth = indicatorMaxWidth * state.player.weapon.reloadProgress;
      const indicatorCoords = Point.fromPercentage(50, 80).shiftX(-indicatorWidth / 2);

      layer.setFont(20, "#ff0000");
      layer.drawTextWithOutline(Point.fromPercentage(50, 85), "RELOADING");
      layer.setFill("#ff0000");
      layer.drawRect(indicatorCoords, indicatorWidth, indicatorHeight);
    }
  }
}
