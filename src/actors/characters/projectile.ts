import { Point } from "../../utils/point";

import { Character } from "../character";
import { Player } from "./player";

export abstract class Projectile extends Character {
  protected abstract trailLength: number;
  protected showHealth = false;
  protected trailColor = "rgba(0, 0, 0, 0.5)";

  public abstract damage: number;
  public maxHealth = 0;

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.moveSpeed, Math.sin(this.facing) * this.moveSpeed);
  }

  constructor(player: Player) {
    super();
    this.coords = Point.clone(player.coords);
  }

  draw() {
    super.draw();
    this.layer.setStroke(this.trailColor, 2 * this.radius);
    this.layer.drawLine(new Point(0, 0), new Point(-this.trailLength, 0));
  }
}
