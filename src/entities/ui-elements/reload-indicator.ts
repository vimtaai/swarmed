import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { state } from "../../state";

export class ReloadIndicator extends UIElement {
  public static coords = Point.fromPercentage(50, 80);
  public static width = 15;
  public static height = 200;

  public render(layer: Layer) {
    if (state.localPlayer.weapon.isReloading) {
      const indicatorWidth = ReloadIndicator.height * state.localPlayer.weapon.reloadProgress;
      const indicatorCoords = ReloadIndicator.coords.shiftX(-indicatorWidth / 2);

      layer.setFont(20, "#ff0000");
      layer.drawTextWithOutline(ReloadIndicator.coords.shiftY(30), "RELOADING");
      layer.setFill("#ff0000");
      layer.drawRect(indicatorCoords, indicatorWidth, ReloadIndicator.width);
    }
  }
}
