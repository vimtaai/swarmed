import { Projectile } from "../../../entities/characters/projectile";

export class Bullet9mm extends Projectile {
  public name = "9MM BULLET";
  public description = "SMALL BULLET WITH LITTLE DAMAGE";
  public radius = 1;
  public moveSpeed = 1000;
  public damage = 25;
  protected primaryColor = "#222222";
  protected secondaryColor = "#222222";
  protected trailLength = 10;
}