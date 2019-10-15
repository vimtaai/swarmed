import { Zombie } from "../zombie";

export class HulkZombie extends Zombie {
  protected absoluteSpeed = 0.4;
  protected maxHealth = 200;

  public secondaryColor = "#666666";
  public primaryColor = "#444444";
  public showHealth = true;

  public radius = 4;
  public health = this.maxHealth;
  public damage = 50;
  public scoreValue = 10;
}
