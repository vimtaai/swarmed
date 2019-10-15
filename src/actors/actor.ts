import { Point } from "../utils/point";

export abstract class Actor {
  protected radius: number;
  protected primaryColor: string;
  protected secondaryColor: string;

  public context: CanvasRenderingContext2D;
  public coords: Point;
  public facing: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.facing = 0;
  }

  protected translateToRelative() {
    this.context.translate(this.coords.x, this.coords.y);
    this.context.rotate(this.facing);
  }

  protected translateToAbsolute() {
    this.context.rotate(-this.facing);
    this.context.translate(-this.coords.x, -this.coords.y);
  }

  public setFacing(target: Point) {
    this.facing = this.coords.facingTo(target);
  }

  public collidesWith(actor: Actor) {
    return this.coords.distanceTo(actor.coords) < this.radius + actor.radius;
  }

  public render() {
    this.context.lineWidth = 2;
    this.context.fillStyle = this.primaryColor;
    this.context.translate(this.coords.x, this.coords.y);
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.context.translate(-this.coords.x, -this.coords.y);
  }
}

export abstract class ActorWithSpeed extends Actor {
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

    this.context.fillStyle = healthColor;
    this.context.strokeStyle = "#000000";
    this.context.beginPath();
    this.context.rect(healthCoords.x, healthCoords.y, healthWidth, healthHeight);
    this.context.fill();
    this.context.beginPath();
    this.context.rect(healthCoords.x, healthCoords.y, healthMaxWidth, healthHeight);
    this.context.stroke();
  }
}
