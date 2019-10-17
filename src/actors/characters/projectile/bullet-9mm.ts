import { Projectile } from "../projectile";

export class Bullet9mm extends Projectile {
  protected primaryColor = "#222222";
  protected secondaryColor = "#222222";
  protected trailLength = 10;

  public name = "9MM BULLET";
  public description = "SMALL BULLET WITH LITTLE DAMAGE";
  public radius = 1;
  public moveSpeed = 1000;
  public damage = 25;
}
