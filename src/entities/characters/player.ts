import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";

import { Weapon } from "../../entities/weapon";
import { Character } from "../../entities/character";
import { Powerup } from "../../entities/characters/powerup";

import { state } from "../../state";

export abstract class Player extends Character {
  public abstract weapon: Weapon;
  public maxShield: number = 100;
  public shield: number = 0;
  public showHealth = false;
  public speed = new Point(0, 0);
  public facing = 0;
  public outlineColor = "#000000";

  public inventory: Powerup | null = null;

  constructor(startingCoords: Point = new Point(50, 50)) {
    super();
    this.coords = startingCoords;
  }

  public get percentShield(): number {
    return this.shield / this.maxShield;
  }

  public render(layer: Layer) {
    this.renderHands(layer);
    this.renderWeapon(layer);
    super.render(layer);
  }

  public renderWeapon(layer: Layer) {
    this.weapon.render(layer);
  }

  public renderHands(layer: Layer) {
    const baseHandPosition = new Point(this.radius, 0);
    const [leftHand, rightHand] = this.weapon.handOffsets;

    layer.setStroke("#000000");
    layer.setFill(this.primaryColor);
    layer.drawArc(baseHandPosition.plus(leftHand), this.radius * 0.4);
    layer.drawArc(baseHandPosition.plus(rightHand), this.radius * 0.4);
  }

  public next(dt: number) {
    this.face(state.mousePosition);

    if (this.weapon.canAutoFire) {
      this.weapon.fire();
    }

    const newCoords = this.coords.plus(this.speed.times(dt));
    if (!newCoords.outOfGameArea) {
      super.next(dt);
    }
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
