import { Point } from "../../utils/point";
import { Actor } from "../actor";
import { Player } from "./player";
import { Projectile } from "./projectile";

export abstract class Weapon extends Actor {
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
    super(player.context);
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
    this.context.strokeStyle = "#000000";
    this.context.fillStyle = this.primaryColor;
    this.context.beginPath();
    this.context.rect(0, -this.height / 2, this.width, this.height);
    this.context.fill();
    this.context.stroke();
  }
}
