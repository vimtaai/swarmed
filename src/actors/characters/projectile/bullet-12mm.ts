import { Projectile } from "../projectile";

export class Bullet12mm extends Projectile {
  protected primaryColor = "#111111";
  protected secondaryColor = "#111111";
  protected trailLength = 20;

  public name = "12MM BULLET";
  public description = "FAST BULLET WITH HIGH DAMAGE";
  public radius = 2;
  public moveSpeed = 1500;
  public damage = 100;
}
