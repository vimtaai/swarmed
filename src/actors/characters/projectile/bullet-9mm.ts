import { Projectile } from "../projectile";

export class Bullet9mm extends Projectile {
  protected absoluteSpeed = 10;
  protected trailLength = 3;

  public primaryColor = "#222222";
  public secondaryColor = "#222222";

  public radius = 0.1;
  public damage = 25;
}
