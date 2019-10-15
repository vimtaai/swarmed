import { Point } from "../../utils/point";
import { ActorWithSpeed } from "../actor";
import { Weapon } from "./weapon";

export abstract class Projectile extends ActorWithSpeed {
  protected absoluteSpeed: number;

  public trailLength: number;

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.absoluteSpeed, Math.sin(this.facing) * this.absoluteSpeed);
  }

  constructor(weapon: Weapon) {
    super(weapon.context);
    this.coords = new Point(weapon.coords.x, weapon.coords.y);
  }

  render() {
    super.render();

    const endOfTrail = Point.fromFacingAndLength(this.facing + Math.PI, this.trailLength, this.coords);
    this.context.strokeStyle = "rgba(0, 0, 0, 0.5)";
    this.context.lineWidth = this.radius * 2;
    this.context.beginPath();
    this.context.moveTo(this.coords.x, this.coords.y);
    this.context.lineTo(endOfTrail.x, endOfTrail.y);
    this.context.stroke();
  }
}
