import { Projectile } from "../projectile";

export class Bullet extends Projectile {
  protected absoluteSpeed: number = 1000;
  protected radius: number = 2;
  protected primaryColor: string = "#222222";

  public trailLength: number = 20;
}
