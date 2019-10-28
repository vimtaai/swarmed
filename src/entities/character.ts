import { percentageToColor } from "../utils/color";

import { Point } from "../classes/point";
import { Layer } from "../classes/layer";
import { Actor } from "../classes/actor";

export abstract class Character extends Actor {
  public abstract name: string;
  public abstract description: string;
  public abstract moveSpeed: number;
  public abstract radius: number;
  public abstract maxHealth: number;
  public health: number = 1;
  public abstract showHealth: boolean;
  public abstract primaryColor: string;
  public abstract secondaryColor: string;
  public outlineColor: string = "transparent";

  public get percentHealth(): number {
    return this.health / this.maxHealth;
  }

  public get isDead(): boolean {
    return this.health <= 0;
  }

  public render(layer: Layer) {
    layer.setStroke(this.outlineColor);
    layer.setFill(this.primaryColor);
    layer.drawArc(new Point(0, 0), this.radius);

    this.renderHealth(layer);
  }

  public renderHealth(layer: Layer) {
    if (!this.showHealth) {
      return;
    }

    const healthMaxWidth = this.maxHealth / 5;
    const healthPercentage = this.health / this.maxHealth;
    const healthWidth = Math.max(healthMaxWidth * healthPercentage, 0);

    layer.setStroke("#000000");
    layer.setFill(percentageToColor(healthPercentage));

    layer.withAbsoluteFacing(this.facing, () => {
      layer.drawRect(new Point(-healthWidth / 2, -this.radius * 2), healthWidth, 7);
    });
  }

  public collidesWith(character: Character) {
    return this.coords.distanceTo(character.coords) < this.radius + character.radius;
  }

  public closestCharacter(characters: Set<Character>): Character {
    let closest: Character;
    let smallestDistance = Infinity;

    characters.forEach(character => {
      const distance = this.coords.distanceTo(character.coords);

      if (this.coords.distanceTo(character.coords) < smallestDistance) {
        smallestDistance = distance;
        closest = character;
      }
    });

    return closest;
  }

  public sufferDamage(damageAmount: number): number {
    const actualDamage = Math.max(damageAmount - this.health, 0);
    this.health = Math.max(this.health - damageAmount, 0);
    return actualDamage;
  }

  public recieveHeal(healAmount: number): number {
    const healthBefore = this.health;
    this.health = Math.min(this.health + healAmount, this.maxHealth);
    const actualHeal = this.health - healthBefore;
    return actualHeal;
  }
}
