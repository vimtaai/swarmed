import { ColorPalette } from "../../utils/color";

import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

export class RestartButton extends UIElement {
  public static coords = Point.fromPercentage(50, 70);
  public static width = 200;
  public static height = 75;

  protected get topLeft(): Point {
    return RestartButton.coords.shiftXY(-RestartButton.width / 2, -RestartButton.height / 2);
  }

  protected get bottomRight(): Point {
    return RestartButton.coords.shiftXY(RestartButton.width / 2, RestartButton.height / 2);
  }

  public render(layer: Layer) {
    layer.setStroke("#000000", 2);
    layer.setFill(this.isHovered ? ColorPalette.PRIMARY_DARK : ColorPalette.PRIMARY);
    layer.drawRect(this.topLeft, RestartButton.width, RestartButton.height);
    layer.setFont(25, "#ffffff");
    layer.drawTextWithOutline(RestartButton.coords, "RESTART");
  }

  public isWithinBoundaries(point: Point): boolean {
    return point.between(this.topLeft, this.bottomRight);
  }
}
