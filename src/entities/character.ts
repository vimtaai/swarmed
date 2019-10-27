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
  protected abstract showHealth: boolean;
  protected abstract primaryColor: string;
  protected abstract secondaryColor: string;
  protected outlineColor: string = "#000000";

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
  }

  public collidesWith(character: Character) {
    return this.coords.distanceTo(character.coords) < this.radius + character.radius;
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
