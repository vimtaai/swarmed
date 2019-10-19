import { Point } from "../../classes/point";
import { Character } from "../character";
import { Weapon } from "../weapon";
import { Projectile } from "./projectile";

import { state } from "../../state";

export abstract class Player extends Character {
  public abstract weapon: Weapon;
  public maxShield: number = 100;
  public shield: number = 0;
  public showHealth = false;
  public speed = new Point(0, 0);
  public facing = 0;
  public projectiles: Projectile[] = [];

  constructor(startingCoords: Point = new Point(50, 50)) {
    super();
    this.coords = startingCoords;
  }

  public get percentShield(): number {
    return this.shield / this.maxShield;
  }

  public render() {
    for (const projectile of this.projectiles) {
      projectile.render();
    }

    this.renderHands();

    this.translateToRelative();
    this.rotateToRelative();

    this.weapon.render();

    this.rotateToAbsolute();
    this.translateToAbsolute();

    super.render();
  }

  public next(dt: number) {
    this.face(state.mousePosition);

    if (this.weapon.canAutoFire) {
      this.weapon.fire();
    }

    for (const projectile of this.projectiles) {
      projectile.next(dt);
    }

    const newCoords = this.coords.plus(this.speed.times(dt));
    if (!newCoords.outOfGameArea) {
      super.next(dt);
    }
  }

  public renderHands() {
    const baseHandPosition = new Point(this.radius, 0);
    const [leftHand, rightHand] = this.weapon.handOffsets;

    this.translateToRelative();
    this.rotateToRelative();

    this.layer.setStroke("#000000");
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(baseHandPosition.plus(leftHand), this.radius * 0.4);
    this.layer.drawArc(baseHandPosition.plus(rightHand), this.radius * 0.4);

    this.rotateToAbsolute();
    this.translateToAbsolute();
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
