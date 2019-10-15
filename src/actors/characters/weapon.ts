import { Point } from "../../utils/point";
import { Character } from "../character";
import { Player } from "./player";
import { Projectile } from "./projectile";

export abstract class Weapon extends Character {
  protected player: Player;
  protected lastFire: number = 0;
  protected reloadTimer: number;

  public primaryColor: string;
  public width: number;
  public height: number;

  public rateOfFire: number;
  public reloadTime: number;
  public maxAmmo: number;
  public remainingAmmo: number;

  public ProjectileType: any;

  public get coords(): Point {
    return Point.fromFacingAndLength(this.player.facing, this.width, this.player.coords);
  }

  public get isReloading(): boolean {
    return this.reloadTimer > 0;
  }

  public get canFire(): boolean {
    const timeSinceLastFire = Date.now() - this.lastFire;

    return timeSinceLastFire >= this.rateOfFire && this.remainingAmmo > 0;
  }

  public constructor(player: Player) {
    super();

    this.player = player;
  }

  public reload() {
    if (this.isReloading) {
      clearInterval(this.reloadTimer);
    }

    this.reloadTimer = setTimeout(() => {
      this.remainingAmmo = this.maxAmmo;
      this.reloadTimer = 0;
    }, this.reloadTime);
  }

  public fire(target: Point): Projectile {
    if (this.canFire) {
      const projectile = new this.ProjectileType(this);

      projectile.setFacing(target);
      this.remainingAmmo--;
      this.lastFire = Date.now();

      if (this.remainingAmmo === 0) {
        this.reload();
      }

      return projectile;
    }
  }

  public render() {
    this.layer.setStroke(2, "#000000");
    this.layer.setFill(this.primaryColor);
    this.layer.drawRect(new Point(0, -this.height / 2), this.width, this.height);
  }
}
