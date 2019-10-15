import { Point } from "../../utils/point";
import { canvas } from "../../canvas";
import { Character } from "../character";
import { Weapon } from "./weapon";

export abstract class Projectile extends Character {
  protected absoluteSpeed: number;
  protected trailLength: number;

  public damage: number;

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.absoluteSpeed, Math.sin(this.facing) * this.absoluteSpeed);
  }

  constructor(weapon: Weapon) {
    super();

    this.coords = new Point(canvas.fromPixels(weapon.coords.x), canvas.fromPixels(weapon.coords.y));
  }

  draw() {
    super.draw();
    this.layer.setStroke("rgba(0, 0, 0, 0.5)", 3 * this.radius);
    this.layer.drawLine(new Point(0, 0), new Point(-this.trailLength, 0));
  }
}
