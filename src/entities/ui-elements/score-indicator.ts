import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { state } from "../../state";

export class ScoreIndicator extends UIElement {
  public static coords = Point.fromPercentage(2, 5);

  public render(layer: Layer) {
    layer.setFont(25, "#ffffff", "left");
    layer.drawTextWithOutline(ScoreIndicator.coords, `SCORE: ${state.score.toString()}`);
  }
}
