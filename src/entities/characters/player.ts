import { removeFromArray } from "../../utils/array";

import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";

import { Character } from "../../entities/character";
import { Weapon } from "../../entities/weapon";
import { Projectile } from "../../entities/characters/projectile";

import { state } from "../../state";

export abstract class Player extends Character {
  public abstract weapon: Weapon;
  public projectiles: Projectile[] = [];
  public maxShield: number = 100;
  public shield: number = 0;
  public showHealth = false;
  public speed = new Point(0, 0);
  public facing = 0;

  constructor(startingCoords: Point = new Point(50, 50)) {
    super();
    this.coords = startingCoords;
  }

  public get percentShield(): number {
    return this.shield / this.maxShield;
  }

  public render(layer: Layer) {
    this.renderProjectiles(layer);
    this.renderHands(layer);
    this.renderWeapon(layer);
    super.render(layer);
  }

  public renderProjectiles(layer: Layer) {
    for (const projectile of this.projectiles) {
      projectile.render(layer);
    }
  }

  public renderWeapon(layer: Layer) {
    this.translateToRelative(layer);
    this.rotateToRelative(layer);

    this.weapon.render(layer);

    this.rotateToAbsolute(layer);
    this.translateToAbsolute(layer);
  }

  public renderHands(layer: Layer) {
    const baseHandPosition = new Point(this.radius, 0);
    const [leftHand, rightHand] = this.weapon.handOffsets;

    this.translateToRelative(layer);
    this.rotateToRelative(layer);

    layer.setStroke("#000000");
    layer.setFill(this.primaryColor);
    layer.drawArc(baseHandPosition.plus(leftHand), this.radius * 0.4);
    layer.drawArc(baseHandPosition.plus(rightHand), this.radius * 0.4);

    this.rotateToAbsolute(layer);
    this.translateToAbsolute(layer);
  }

  public next(dt: number) {
    this.face(state.mousePosition);

    if (this.weapon.canAutoFire) {
      this.weapon.fire();
    }

    this.nextProjectiles(dt);

    const newCoords = this.coords.plus(this.speed.times(dt));
    if (!newCoords.outOfGameArea) {
      super.next(dt);
    }
  }

  public nextProjectiles(dt: number) {
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

  public sufferDamage(damageAmount: number) {
    let damage = damageAmount;

    if (this.shield > 0) {
      const damageToHealth = Math.max(damage - this.shield, 0);
      this.shield = Math.max(this.shield - damage, 0);
      damage = damageToHealth;
    }

    this.health -= damage;

    return damage;
  }
}
