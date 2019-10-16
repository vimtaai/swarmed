import { randomBetween } from "../../utils/random";
import { Point } from "../../utils/point";
import { Character } from "../character";

export abstract class Zombie extends Character {
  public static spawnRate: number;
  protected absoluteSpeed: number;

  public damage: number;
  public scoreValue: number;

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.absoluteSpeed, Math.sin(this.facing) * this.absoluteSpeed);
  }

  public setCoords() {
    const side = randomBetween(1, 4);

    if (side === 1) {
      // ! top
      this.coords = new Point(randomBetween(0, 100), -this.radius);
    } else if (side === 2) {
      // ! right
      this.coords = new Point(100 + this.radius, randomBetween(0, 100));
    } else if (side === 3) {
      // ! bottom
      this.coords = new Point(randomBetween(0, 100), 100 + this.radius);
    } else if (side === 4) {
      // ! left
      this.coords = new Point(-this.radius, randomBetween(0, 100));
    }
  }

  public draw() {
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(this.radius * 0.9, -this.radius * 0.8), this.radius * 0.3);
    this.layer.drawArc(new Point(this.radius * 0.9, this.radius * 0.8), this.radius * 0.3);

    super.draw();
  }
}
