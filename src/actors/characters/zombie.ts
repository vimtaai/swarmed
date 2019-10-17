import { randomBetween } from "../../utils/random";
import { Point } from "../../utils/point";
import { Character } from "../character";

export abstract class Zombie extends Character {
  public static spawnRate: number;
  public abstract damage: number;
  public abstract scoreValue: number;

  public get speed(): Point {
    const xSpeed = this.moveSpeed * Math.cos(this.facing);
    const ySpeed = this.moveSpeed * Math.sin(this.facing);
    return new Point(xSpeed, ySpeed);
  }

  public setCoords() {
    const side = randomBetween(1, 4);

    if (side === 1) {
      // ! top
      this.coords = Point.fromPercentage(randomBetween(0, 100), 0).shiftY(-this.radius);
    } else if (side === 2) {
      // ! right
      this.coords = Point.fromPercentage(100, randomBetween(0, 100)).shiftX(this.radius);
    } else if (side === 3) {
      // ! bottom
      this.coords = Point.fromPercentage(randomBetween(0, 100), 100).shiftY(this.radius);
    } else if (side === 4) {
      // ! left
      this.coords = Point.fromPercentage(0, randomBetween(0, 100)).shiftX(-this.radius);
    }
  }

  public draw() {
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(this.radius * 0.8, -this.radius * 0.8), this.radius * 0.3);
    this.layer.drawArc(new Point(this.radius * 0.8, this.radius * 0.8), this.radius * 0.3);

    super.draw();
  }
}
