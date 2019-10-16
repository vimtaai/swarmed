import { Zombie } from "../zombie";

export class RunnerZombie extends Zombie {
  public static spawnRate = 0.5;

  protected absoluteSpeed = 2;
  protected maxHealth = 1;

  public primaryColor = "#447744";
  public secondaryColor = "#557755";

  public radius = 2;
  public health = this.maxHealth;
  public damage = 5;
  public scoreValue = 2;
}
