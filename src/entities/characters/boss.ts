import { removeFromArray } from "../../utils/array";

import { Layer } from "../../classes/layer";

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

  public render(layer: Layer) {
    this.renderProjectiles(layer);
    this.renderWeapon(layer);
    super.render(layer);
  }

  public renderProjectiles(layer: Layer) {
    this.projectiles.forEach(projectile => {
      projectile.render(layer);
    });
  }

  public renderWeapon(layer: Layer) {
    this.weapon.render(layer);
  }
}
