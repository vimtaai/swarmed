import { Point } from "../utils/point";
import { Layer } from "../utils/layer";
import { Actor } from "../utils/actor";

import { foreground } from "../layers";

import { Player } from "./characters/player";

export abstract class Weapon extends Actor {
  protected abstract length: number;
  protected abstract width: number;
  protected abstract primaryColor: string;
  protected layer: Layer = foreground;
  protected player: Player;
  protected lastFire: number = 0;
  protected reloadStarted: number = 0;
  protected reloadTimer: number = 0;

  public abstract isAutomatic: boolean;
  public abstract rateOfFire: number;
  public abstract reloadTime: number;
  public abstract maxAmmo: number;
  public abstract ProjectileType: any;
  public abstract handOffsets: Point[];
  public isFiring: boolean = false;
  public ammo: number = 0;

  public get isReloading(): boolean {
    return this.reloadTimer > 0;
  }

  public get canFire(): boolean {
    const timeSinceLastFire = Date.now() - this.lastFire;
    const hasAmmo = this.ammo > 0;
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
    this.ammo = 0;

    this.reloadTimer = setTimeout(() => {
      this.ammo = this.maxAmmo;
      this.reloadTimer = 0;
    }, this.reloadTime);
  }

  public fire() {
    if (this.canFire && this.ammo > 0) {
      const projectile = new this.ProjectileType(this.player);

      projectile.facing = this.player.facing;
      this.ammo--;
      this.lastFire = Date.now();

      if (this.ammo === 0) {
        this.reload();
      }

      this.player.projectiles.push(projectile);
    }
  }

  public draw() {
    this.layer.setStroke("#000000");
    this.layer.setFill(this.primaryColor);
    this.layer.drawRect(new Point(this.player.radius, -this.width / 2), this.length, this.width);
  }
}
