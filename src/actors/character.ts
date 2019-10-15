import { Point } from "../utils/point";
import { Layer, Layers } from "../layers";

export abstract class Character {
  protected radius: number;

  public name: string;
  public primaryColor: string;
  public secondaryColor: string;
  public description: string;

  public layer: Layer;
  public facing: number;
  public coords: Point;

  constructor() {
    this.layer = Layers.foreground;
    this.facing = 0;
  }

  protected translateToRelative() {
    this.layer.context.translate(this.coords.x, this.coords.y);
    this.layer.context.rotate(this.facing);
  }

  protected translateToAbsolute() {
    this.layer.context.rotate(-this.facing);
    this.layer.context.translate(-this.coords.x, -this.coords.y);
  }

  public setFacing(target: Point) {
    this.facing = this.coords.facingTo(target);
  }

  public collidesWith(actor: Character) {
    return this.coords.distanceTo(actor.coords) < this.radius + actor.radius;
  }

  public render() {
    this.layer.setStroke(2, "#000000");
    this.layer.setFill(this.primaryColor);

    this.layer.context.translate(this.coords.x, this.coords.y);
    this.layer.drawArc(new Point(0, 0), this.radius);
    this.layer.context.translate(-this.coords.x, -this.coords.y);
  }
}

export abstract class ActorWithSpeed extends Character {
  protected speed: Point;

  public next(dt: number) {
    this.coords.x += this.speed.x * dt;
    this.coords.y += this.speed.y * dt;
  }
}

export abstract class ActorWithHealth extends ActorWithSpeed {
  protected maxHealth: number;

  public health: number;

  public render() {
    super.render();

    const healthMaxWidth = this.radius * 2;
    const healthCoords = new Point(this.coords.x - healthMaxWidth / 2, this.coords.y - this.radius * 2);
    const healthWidth = Math.max(healthMaxWidth * (this.health / this.maxHealth), 0);
    const healthHeight = 5;
    const healthColors = ["#ff0000", "#ff8800", "#ffff00", "#00ff55"];
    const healthColorIndex = Math.floor((this.health / this.maxHealth) * (healthColors.length - 1));
    const healthColor = healthColors[healthColorIndex];

    this.layer.setFill(healthColor);
    this.layer.setStroke(2, "#000000");
    this.layer.drawRect(new Point(healthCoords.x, healthCoords.y), healthWidth, healthHeight);
  }
}
