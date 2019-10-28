import { Projectile } from "../../../entities/characters/projectile";

export class LaserBolt extends Projectile {
  public name = "LASER BOLT";
  public description = "EXTREMELY FAST PROJECTILE WITH HIGH DAMAGE";
  public radius = 2;
  public moveSpeed = 2500;
  public damage = 50;
  public primaryColor = "#dd2222";
  public secondaryColor = "#dd2222";
  protected trailLength = 15;
}
