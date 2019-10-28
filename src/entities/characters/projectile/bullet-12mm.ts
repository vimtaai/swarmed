import { Projectile } from "../../../entities/characters/projectile";

export class Bullet12mm extends Projectile {
  public name = "12MM BULLET";
  public description = "FAST BULLET WITH HIGH DAMAGE";
  public radius = 3;
  public moveSpeed = 1500;
  public damage = 100;
  public primaryColor = "#111111";
  public secondaryColor = "rgba(0, 0, 0, 0.5)";
  protected trailLength = 20;
}
