import { ColorPalette } from "../../utils/color";

import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

export class RestartButton extends UIElement {
  public static width = 200;
  public static height = 75;

  protected coords: Point;
  protected topLeft: Point;
  protected bottomRight: Point;

  public render(layer: Layer) {
    this.coords = Point.fromPercentage(50, 70);
    this.topLeft = this.coords.shiftXY(-RestartButton.width / 2, -RestartButton.height / 2);
    this.bottomRight = this.coords.shiftXY(RestartButton.width / 2, RestartButton.height / 2);

    layer.setStroke("#000000", 2);
    layer.setFill(this.isHovered ? ColorPalette.PRIMARY_DARK : ColorPalette.PRIMARY);
    layer.drawRect(this.topLeft, RestartButton.width, RestartButton.height);
    layer.setFont(25, "#ffffff");
    layer.drawTextWithOutline(this.coords, "RESTART");
  }

  public isWithinBoundaries(point: Point): boolean {
    return point.between(this.topLeft, this.bottomRight);
  }
}
