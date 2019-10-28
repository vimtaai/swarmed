import { Zombie } from "../zombie";

export class CommonZombie extends Zombie {
  public static spawnRate = 1.5;

  public name = "COMMON ZOMBIE";
  public description: "SLOW, EASY TO KILL BUT WANTS BRAINS ANYWAYS";
  public radius = 17;
  public moveSpeed = 75;
  public maxHealth = 1;
  public damage = 10;
  public scoreValue = 1;
  public health = this.maxHealth;
  public primaryColor = "#666666";
  public secondaryColor = "#888888";
  public showHealth = false;
}
