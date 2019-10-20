import { removeFromArray } from "../../utils/array";

import { Zombie } from "./zombie";
import { Weapon } from "../weapon";
import { Projectile } from "./projectile";

export abstract class Boss extends Zombie {
  public abstract weapon: Weapon;
  public projectiles: Projectile[] = [];

  public next(dt: number) {
    super.next(dt);

    if (this.weapon.canAutoFire) {
      this.weapon.fire();
    }

    this.nextProjectiles(dt);
  }

  public nextProjectiles(dt) {
    for (const projectile of this.projectiles) {
      projectile.next(dt);

      if (projectile.coords.outOfGameArea) {
        this.destroyProjectile(projectile);
      }
    }
  }

  public destroyProjectile(projectile: Projectile) {
    removeFromArray(this.projectiles, projectile);
  }

  public render() {
    this.renderProjectiles();
    this.renderWeapon();
    super.render();
  }

  public renderProjectiles() {
    for (const projectile of this.projectiles) {
      projectile.render();
    }
  }

  public renderWeapon() {
    this.translateToRelative();
    this.rotateToRelative();

    this.weapon.render();

    this.rotateToAbsolute();
    this.translateToAbsolute();
  }
}
