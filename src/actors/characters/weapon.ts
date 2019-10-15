import { Point } from "../../utils/point";

import { state } from "../../state";

import { Character } from "../character";
import { Player } from "./player";

export abstract class Weapon extends Character {
  protected player: Player;
  protected isAutomatic: boolean = false;
  protected lastFire: number = 0;
  protected reloadTimer: number;
  protected reloadStarted: number;

  public primaryColor: string;
  public length: number;
  public width: number;

  public handOffsets: Point[];
  public rateOfFire: number;
  public reloadTime: number;
  public maxAmmo: number;
  public remainingAmmo: number;
  public isFiring: boolean = false;

  public ProjectileType: any;

  public get coords(): Point {
    return Point.fromFacingAndLength(this.player.facing, this.player.radius, this.player.coords);
  }

  public get isReloading(): boolean {
    return this.reloadTimer > 0;
  }

  public get canFire(): boolean {
    const timeSinceLastFire = Date.now() - this.lastFire;
    const hasAmmo = this.remainingAmmo > 0;

    return timeSinceLastFire >= this.rateOfFire && hasAmmo;
  }

  public get canAutoFire(): boolean {
    return this.isAutomatic && this.isFiring && this.canFire;
  }

  public constructor(player: Player) {
    super();

    this.player = player;
  }

  public reload() {
    if (this.isReloading) {
      clearInterval(this.reloadTimer);
    }

    this.reloadStarted = Date.now();
    this.remainingAmmo = 0;

    this.reloadTimer = setTimeout(() => {
      this.remainingAmmo = this.maxAmmo;
      this.reloadTimer = 0;
    }, this.reloadTime);
  }

  public fire() {
    if (this.canFire && this.remainingAmmo > 0) {
      const projectile = new this.ProjectileType(this);

      projectile.facing = this.player.coords.facingTo(state.mousePosition);

      this.remainingAmmo--;
      this.lastFire = Date.now();

      if (this.remainingAmmo === 0) {
        this.reload();
      }

      this.player.projectiles.push(projectile);
    }
  }

  public draw() {
    this.layer.setStroke("#000000");
    this.layer.setFill(this.primaryColor);
    this.layer.drawRect(new Point(0, -this.width / 2), this.length, this.width);
  }
}
