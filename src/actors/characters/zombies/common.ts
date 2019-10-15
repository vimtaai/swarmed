import { Zombie } from "../zombie";

export class CommonZombie extends Zombie {
  protected absoluteSpeed = 0.5;
  protected maxHealth = 1;

  public radius = 2.5;

  public secondaryColor = "#888888";
  public primaryColor = "#666666";

  public health = this.maxHealth;
  public damage = 10;
}
