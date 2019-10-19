import { percentageToColor } from "../utils/color";
import { Point } from "../classes/point";
import { Actor } from "../types/renderable/actor";

import { foreground } from "../layers";
import { Character } from "./character";

export class Explosion extends Actor {
  protected layer = foreground;
  protected maxRadius: number;
  protected duration: number = 100;
  protected startTime: number = Date.now();
  public radius: number = 0;
  public damage: number;

  public constructor(center: Point, maxRadius: number, damage: number) {
    super();
    this.coords = center;
    this.maxRadius = maxRadius;
    this.damage = damage;
  }

  public get percentExploded(): number {
    return this.radius / this.maxRadius;
  }

  public get isFinished(): boolean {
    return this.radius >= this.maxRadius;
  }

  public render() {
    this.translateToRelative();
    this.rotateToRelative();

    this.layer.setStroke("#000000");
    this.layer.setFill(percentageToColor(this.percentExploded, 60, 0));
    this.layer.drawArc(new Point(0, 0), this.radius);

    this.rotateToAbsolute();
    this.translateToAbsolute();
  }

  public next(dt: number) {
    const timeSinceStart = Date.now() - this.startTime;
    this.radius = Math.min(timeSinceStart / this.duration, 1) * this.maxRadius;
  }

  public collidesWith(character: Character) {
    return this.coords.distanceTo(character.coords) < this.radius + character.radius;
  }
}
