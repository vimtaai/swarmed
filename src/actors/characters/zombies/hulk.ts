import { Zombie } from "../zombie";

export class HulkZombie extends Zombie {
  public static spawnRate = 0.2;

  protected primaryColor = "#444444";
  protected secondaryColor = "#666666";
  protected showHealth = true;

  public name = "HULK ZOMBIE";
  public description: "VERY SLOW BUT BULKY AND DOES TONS OF DAMAGE";
  public radius = 30;
  public moveSpeed = 50;
  public maxHealth = 200;
  public damage = 50;
  public scoreValue = 10;

  public health = this.maxHealth;
}
