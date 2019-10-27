import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";

import { Character } from "../../entities/character";
import { Player } from "../../entities/characters/player";

export abstract class Projectile extends Character {
  public abstract damage: number;
  public maxHealth = 0;
  protected abstract trailLength: number;
  protected showHealth = false;
  protected trailColor = "rgba(0, 0, 0, 0.5)";

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.moveSpeed, Math.sin(this.facing) * this.moveSpeed);
  }

  constructor(player: Player) {
    super();
    this.coords = Point.clone(player.coords);
  }

  public render(layer: Layer) {
    this.renderTrail(layer);
    super.render(layer);
  }

  protected renderTrail(layer: Layer) {
    this.translateToRelative(layer);
    this.rotateToRelative(layer);

    layer.setStroke(this.trailColor, 2 * this.radius);
    layer.drawLine(new Point(0, 0), new Point(-this.trailLength, 0));

    this.rotateToAbsolute(layer);
    this.translateToAbsolute(layer);
  }
}
