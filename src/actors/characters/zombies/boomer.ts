import { Explodable } from "../../../types/explodable";
import { Zombie } from "../zombie";
import { Explosion } from "../../explosion";

export class BoomerZombie extends Zombie implements Explodable {
  public static spawnRate = 0.3;

  public name = "BOOMER ZOMBIE";
  public description: "RELATIVELY EASY TO KILL BUT HITS REALLY HARD";
  public radius = 20;
  public moveSpeed = 75;
  public maxHealth = 50;
  public damage = 100;
  public scoreValue = 5;
  public explosionRadius = 80;
  public explosionDamage = 15;
  public health = this.maxHealth;
  protected primaryColor = "#aa6666";
  protected secondaryColor = "#bb8888";
  protected showHealth = true;

  public createExplosion(): Explosion {
    return new Explosion(this.coords, this.explosionRadius, this.explosionDamage);
  }
}
