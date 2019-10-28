import { Projectile } from "../../../entities/characters/projectile";

export class Bullet9mm extends Projectile {
  public name = "9MM BULLET";
  public description = "SMALL BULLET WITH LITTLE DAMAGE";
  public radius = 2;
  public moveSpeed = 1000;
  public damage = 25;
  public primaryColor = "#222222";
  public secondaryColor = "rgba(0, 0, 0, 0.5)";
  protected trailLength = 10;
}
