import { randomBetween } from "../../utils/random";
import { Point } from "../../utils/point";
import { ActorWithSpeed } from "../actor";

export abstract class Zombie extends ActorWithSpeed {
  protected absoluteSpeed: number;

  public damage: number;

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.absoluteSpeed, Math.sin(this.facing) * this.absoluteSpeed);
  }

  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }

  public setCoords() {
    const width: number = this.context.canvas.width;
    const height: number = this.context.canvas.height;
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
    this.context.fillStyle = this.secondaryColor;
    this.context.beginPath();
    this.context.arc(this.radius - 5, -this.radius + 5, this.radius / 3, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(this.radius - 5, this.radius - 5, this.radius / 3, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.translateToAbsolute();

    super.render();
  }
}
