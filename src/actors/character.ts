import { Point } from "../utils/point";
import { Layer, layers } from "../layers";
import { canvas } from "../canvas";

export abstract class Character {
  protected speed: Point;
  protected maxHealth: number;
  protected showHealth: boolean = false;

  public name: string;
  public primaryColor: string;
  public secondaryColor: string;
  public description: string;

  public health: number;
  public layer: Layer;
  public coords: Point;
  public facing: number;
  public radius: number;

  constructor() {
    this.layer = layers.foreground;
    this.facing = 0;
  }

  protected withAbsoluteFacing(fn: Function) {
    this.layer.context.rotate(-this.facing);
    fn.call(this);
    this.layer.context.rotate(this.facing);
  }

  protected withAbsoluteCoords(fn: Function) {
    this.withAbsoluteFacing(function() {
      this.layer.context.translate(-this.coords.x, -this.coords.y);
      fn.call(this);
      this.layer.context.translate(this.coords.x, this.coords.y);
    });
  }

  public setFacing(target: Point) {
    this.facing = this.coords.facingTo(target);
  }

  public collidesWith(actor: Character) {
    return this.coords.distanceTo(actor.coords) < this.radius + actor.radius;
  }

  public next(dt: number) {
    this.coords.x += canvas.toPixels(this.speed.x * dt);
    this.coords.y += canvas.toPixels(this.speed.y * dt);
  }

  public draw() {
    this.layer.setStroke(2, "#000000");
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(new Point(0, 0), this.radius);

    if (!this.showHealth) {
      return;
    }

    const healthMaxWidth = this.maxHealth / 50;
    const healthWidth = Math.max(healthMaxWidth * (this.health / this.maxHealth), 0);
    const healthColors = ["#ff0000", "#ff8800", "#ffff00", "#00ff55"];
    const healthColorIndex = Math.floor((this.health / this.maxHealth) * (healthColors.length - 1));

    this.layer.setFill(healthColors[healthColorIndex]);
    this.layer.setStroke(2, "#000000");
    this.withAbsoluteFacing(function() {
      this.layer.drawRect(new Point(-healthWidth / 2, -this.radius * 1.8), healthWidth, 0.7);
    });
  }

  public render() {
    this.layer.context.translate(this.coords.x, this.coords.y);
    this.layer.context.rotate(this.facing);
    this.draw();
    this.layer.context.rotate(-this.facing);
    this.layer.context.translate(-this.coords.x, -this.coords.y);
  }
}
