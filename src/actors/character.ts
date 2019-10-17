import { Point } from "../utils/point";
import { Layer } from "../utils/layer";
import { Actor } from "../utils/actor";

import { foreground } from "../layers";

export abstract class Character extends Actor {
  protected abstract primaryColor: string;
  protected abstract secondaryColor: string;
  protected abstract showHealth: boolean;
  protected layer: Layer = foreground;

  public abstract name: string;
  public abstract description: string;
  public abstract moveSpeed: number;
  public abstract maxHealth: number;
  public abstract radius: number;
  public coords: Point;
  public speed: Point;
  public facing: number;
  public health: number;

  constructor() {
    super();
  }

  protected withAbsoluteFacing(fn: Function) {
    this.layer.context.rotate(-this.facing);
    fn.call(this);
    this.layer.context.rotate(this.facing);
  }

  protected withAbsoluteCoords(fn: Function) {
    this.withAbsoluteFacing(function() {
      this.layer.context.translate(-this.coords.realX, -this.coords.realY);
      fn.call(this);
      this.layer.context.translate(this.coords.realX, this.coords.realY);
    });
  }

  public setFacing(target: Point) {
    this.facing = this.coords.facingTo(target);
  }

  public collidesWith(actor: Character) {
    return this.coords.distanceTo(actor.coords) < this.radius + actor.radius;
  }

  public next(dt: number) {
    this.coords.x += this.speed.x * dt;
    this.coords.y += this.speed.y * dt;
  }

  public draw() {
    this.layer.setStroke("#000000");
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(new Point(0, 0), this.radius);

    if (!this.showHealth) {
      return;
    }

    const healthMaxWidth = this.maxHealth / 5;
    const healthWidth = Math.max(healthMaxWidth * (this.health / this.maxHealth), 0);
    const healthColors = ["#ff0000", "#ff8800", "#ffff00", "#00ff55"];
    const healthColorIndex = Math.floor((this.health / this.maxHealth) * (healthColors.length - 1));

    this.layer.setFill(healthColors[healthColorIndex]);
    this.layer.setStroke("#000000");
    this.withAbsoluteFacing(function() {
      this.layer.drawRect(new Point(-healthWidth / 2, -this.radius * 2), healthWidth, 7);
    });
  }

  public render() {
    this.layer.context.translate(this.coords.realX, this.coords.realY);
    this.layer.context.rotate(this.facing);
    this.draw();
    this.layer.context.rotate(-this.facing);
    this.layer.context.translate(-this.coords.realX, -this.coords.realY);
  }
}
