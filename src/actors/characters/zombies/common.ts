import { Zombie } from "../zombie";

export class CommonZombie extends Zombie {
  public static spawnRate = 2;

  protected absoluteSpeed = 0.5;
  protected maxHealth = 1;

  public secondaryColor = "#888888";
  public primaryColor = "#666666";

  public radius = 2.5;
  public health = this.maxHealth;
  public damage = 10;
  public scoreValue = 1;
}
