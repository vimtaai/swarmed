import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { state } from "../../state";

export class ScoreIndicator extends UIElement {
  public render(layer: Layer) {
    const indicatorCoords = Point.fromPercentage(2, 5);

    layer.setFont(25, "#ffffff", "left");
    layer.drawTextWithOutline(indicatorCoords, `SCORE: ${state.score.toString()}`);
  }
}
