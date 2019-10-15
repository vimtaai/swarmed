import { Point } from "../../../utils/point";
import { Weapon } from "../weapon";
import { Bullet9mm } from "../projectile/bullet-9mm";

export class Pistol extends Weapon {
  public length = 4;
  public width = 0.75;
  public primaryColor = "#cccccc";

  public handOffsets = [new Point(0, 0), new Point(0, 0)];
  public rateOfFire = 150;
  public reloadTime = 1000;
  public maxAmmo = 20;
  public remainingAmmo = this.maxAmmo;

  public ProjectileType = Bullet9mm;
}
