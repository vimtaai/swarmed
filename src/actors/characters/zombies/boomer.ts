import { Zombie } from "../zombie";

export class BoomerZombie extends Zombie {
  public static spawnRate = 0.3;

  protected primaryColor = "#aa6666";
  protected secondaryColor = "#bb8888";
  protected showHealth = true;

  public name = "BOOMER ZOMBIE";
  public description: "RELATIVELY EASY TO KILL BUT HITS REALLY HARD";
  public radius = 20;
  public moveSpeed = 75;
  public maxHealth = 50;
  public damage = 100;
  public scoreValue = 5;

  public health = this.maxHealth;
}
