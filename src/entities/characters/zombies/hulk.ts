import { Zombie } from "../zombie";

export class HulkZombie extends Zombie {
  public static spawnRate = 0.2;

  public name = "HULK ZOMBIE";
  public description: "VERY SLOW BUT BULKY AND DOES TONS OF DAMAGE";
  public radius = 30;
  public moveSpeed = 50;
  public maxHealth = 200;
  public damage = 50;
  public scoreValue = 10;
  public health = this.maxHealth;
  public primaryColor = "#444444";
  public secondaryColor = "#666666";
  public showHealth = true;
}
