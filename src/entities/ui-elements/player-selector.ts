import { UIElement } from "../../classes/ui-element";
import { Point } from "../../classes/point";

import { Player } from "../../entities/characters/player";
import { Layer } from "../../classes/layer";

export class PlayerSelector extends UIElement {
  public static width = 500;
  public static height = 100;

  public player: Player;
  protected coords: Point;

  public constructor(player: Player, position: Point) {
    super();
    this.player = player;
    this.coords = position;
  }

  public render(layer: Layer) {
    if (this.isHovered) {
      const rectCoords = this.coords.shiftXY(-PlayerSelector.width / 2, -PlayerSelector.height / 2);
      layer.setFill("#222222");
      layer.drawRect(rectCoords, PlayerSelector.width, PlayerSelector.height);
    }

    this.player.coords = this.coords.shiftX(PlayerSelector.width / 4);
    this.player.renderRelative(layer);

    layer.setFont(22, "#ffffff", "left");
    layer.drawText(this.coords.shiftXY(-PlayerSelector.width / 3, -PlayerSelector.height / 5), this.player.name);
    layer.setFont(20, "#aaaaaa", "left");
    layer.drawText(this.coords.shiftXY(-PlayerSelector.width / 3, PlayerSelector.height / 5), this.player.description);
  }

  public isWithinBoundaries(point: Point): boolean {
    const topLeft = this.coords.shiftXY(-PlayerSelector.width / 2, -PlayerSelector.height / 2);
    const bottomRight = this.coords.shiftXY(PlayerSelector.width / 2, PlayerSelector.height / 2);

    return point.between(topLeft, bottomRight);
  }
}
