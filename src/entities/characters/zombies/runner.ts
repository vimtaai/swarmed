import { Zombie } from "../zombie";

export class RunnerZombie extends Zombie {
  public static spawnRate = 0.5;

  public name = "RUNNER ZOMBIE";
  public description: "EXTREMELY FAST, BUT DOES LITTLE DAMAGE";
  public radius = 13;
  public moveSpeed = 150;
  public maxHealth = 1;
  public damage = 5;
  public scoreValue = 2;
  public health = this.maxHealth;
  public primaryColor = "#447744";
  public secondaryColor = "#557755";
  public showHealth = false;
}
