import { Explodable } from "../../../interfaces/explodable";
import { Zombie } from "../zombie";
import { Explosion } from "../../explosion";

export class BoomerZombie extends Zombie implements Explodable {
  public static spawnRate = 0.3;

  public name = "BOOMER ZOMBIE";
  public description: "HITS REALLY HARD AND EXPLODES WHEN KILLED";
  public radius = 20;
  public moveSpeed = 75;
  public maxHealth = 50;
  public damage = 100;
  public scoreValue = 5;
  public explosionRadius = 80;
  public explosionDamage = 50;
  public health = this.maxHealth;
  public primaryColor = "#aa6666";
  public secondaryColor = "#bb8888";
  public showHealth = true;

  public explode(): Explosion {
    return new Explosion(this.coords, this.explosionRadius, this.explosionDamage);
  }
}
