import { UIElement } from "../types/renderable/ui-element";
import { Point } from "../classes/point";

import { Player } from "../actors/characters/player";

import { foreground } from "../layers";

export class PlayerSelector extends UIElement {
  public static width = 500;
  public static height = 100;

  public layer = foreground;
  public player: Player;
  protected coords: Point;

  public constructor(player: Player, position: Point) {
    super();
    this.player = player;
    this.coords = position;
  }

  public render() {
    if (this.isHovered) {
      const rectCoords = this.coords.shiftXY(-PlayerSelector.width / 2, -PlayerSelector.height / 2);
      this.layer.setFill("#222222");
      this.layer.drawRect(rectCoords, PlayerSelector.width, PlayerSelector.height);
    }

    this.player.showHealth = false;
    this.player.coords = this.coords.shiftX(PlayerSelector.width / 4);
    this.player.render();

    this.layer.setFont(22, "#ffffff", "left");
    this.layer.drawText(this.coords.shiftXY(-PlayerSelector.width / 3, -PlayerSelector.height / 5), this.player.name);
    this.layer.setFont(20, "#aaaaaa", "left");
    this.layer.drawText(
      this.coords.shiftXY(-PlayerSelector.width / 3, PlayerSelector.height / 5),
      this.player.description
    );
  }

  public isWithinBoundaries(point: Point): boolean {
    const topLeft = this.coords.shiftXY(-PlayerSelector.width / 2, -PlayerSelector.height / 2);
    const bottomRight = this.coords.shiftXY(PlayerSelector.width / 2, PlayerSelector.height / 2);

    return point.between(topLeft, bottomRight);
  }
}
