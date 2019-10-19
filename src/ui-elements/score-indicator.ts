import { UIElement } from "../types/renderable/ui-element";
import { Point } from "../classes/point";

import { state } from "../state";

export class ScoreIndicator extends UIElement {
  public render() {
    const indicatorCoords = Point.fromPercentage(2, 5);

    this.layer.setFont(25, "#ffffff", "left");
    this.layer.drawTextWithOutline(indicatorCoords, `SCORE: ${state.score.toString()}`);
  }
}
