import { Point } from "../../utils/point";
import { ActorWithSpeed } from "../character";
import { Weapon } from "./weapon";

export abstract class Projectile extends ActorWithSpeed {
  protected absoluteSpeed: number;

  public trailLength: number;

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.absoluteSpeed, Math.sin(this.facing) * this.absoluteSpeed);
  }

  constructor(weapon: Weapon) {
    super();

    this.coords = new Point(weapon.coords.x, weapon.coords.y);
  }

  render() {
    super.render();

    const endOfTrail = Point.fromFacingAndLength(this.facing + Math.PI, this.trailLength, this.coords);

    this.layer.setStroke(2 * this.radius, "rgba(0, 0, 0, 0.5)");
    this.layer.drawLine(this.coords, endOfTrail);
  }
}
