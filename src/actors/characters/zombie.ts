import { randomBetween } from "../../utils/random";
import { Point } from "../../utils/point";
import { ActorWithSpeed } from "../character";

export abstract class Zombie extends ActorWithSpeed {
  protected absoluteSpeed: number;

  public damage: number;

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.absoluteSpeed, Math.sin(this.facing) * this.absoluteSpeed);
  }

  public setCoords() {
    const width: number = this.layer.canvas.width;
    const height: number = this.layer.canvas.height;
    const side = randomBetween(1, 4);

    if (side === 1) {
      // ! top
      this.coords = new Point(randomBetween(0, width), -this.radius);
    } else if (side === 2) {
      // ! right
      this.coords = new Point(width + this.radius, randomBetween(0, height));
    } else if (side === 3) {
      // ! bottom
      this.coords = new Point(randomBetween(0, width), height + this.radius);
    } else if (side === 4) {
      // ! left
      this.coords = new Point(-this.radius, randomBetween(0, height));
    }
  }

  public render() {
    this.translateToRelative();

    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(this.radius - 5, -this.radius + 5), this.radius / 3);
    this.layer.drawArc(new Point(this.radius - 5, this.radius - 5), this.radius / 3);

    this.translateToAbsolute();

    super.render();
  }
}
