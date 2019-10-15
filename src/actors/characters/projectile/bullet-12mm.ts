import { Projectile } from "../projectile";

export class Bullet12mm extends Projectile {
  protected absoluteSpeed = 15;
  protected trailLength = 6;

  public primaryColor = "#111111";
  public secondaryColor = "#111111";

  public radius = 0.15;
  public damage = 100;
}
