import { Renderable } from "../interfaces/renderable";

import { Point } from "../classes/point";
import { Layer } from "../classes/layer";

import { Character } from "../entities/character";

import { state } from "../state";

export abstract class Weapon implements Renderable {
  public abstract isAutomatic: boolean;
  public abstract rateOfFire: number;
  public abstract reloadTime: number;
  public abstract maxAmmo: number;
  public abstract ProjectileType: any;
  public abstract handOffsets: Point[];
  public isFiring: boolean = false;
  public ammo: number = 0;
  protected abstract length: number;
  protected abstract width: number;
  protected abstract primaryColor: string;
  protected owner: Character;
  protected lastFire: number = 0;
  protected reloadStarted: number = 0;
  protected reloadTimer: number = 0;

  public constructor(owner: Character) {
    this.owner = owner;
  }

  public render(layer: Layer) {
    layer.setStroke("#000000");
    layer.setFill(this.primaryColor);
    layer.drawRect(new Point(this.owner.radius, -this.width / 2), this.length, this.width);
  }

  public get canFire(): boolean {
    const timeSinceLastFire = Date.now() - this.lastFire;
    const hasAmmo = this.ammo > 0;
    return timeSinceLastFire >= this.rateOfFire && hasAmmo;
  }

  public get canAutoFire(): boolean {
    return this.isAutomatic && this.isFiring && this.canFire;
  }

  public get isReloading(): boolean {
    return this.reloadTimer > 0;
  }

  public get reloadProgress(): number {
    const timeElapsed = Date.now() - this.reloadStarted;

    return 1 - timeElapsed / this.reloadTime;
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
      const projectile = new this.ProjectileType(this.owner);

      projectile.facing = this.owner.facing;
      this.ammo--;
      this.lastFire = Date.now();

      if (this.ammo === 0) {
        this.reload();
      }

      state.projectiles.add(projectile);
    }
  }
}
