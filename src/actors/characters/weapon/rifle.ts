import { Point } from "../../../utils/point";
import { Weapon } from "../weapon";
import { Bullet12mm } from "../projectile/bullet-12mm";

export class Rifle extends Weapon {
  public length = 8;
  public width = 0.75;
  public primaryColor = "#882200";

  public handOffsets = [new Point(0, 0), new Point(3, 0.3)];
  public rateOfFire = 300;
  public reloadTime = 1500;
  public maxAmmo = 12;
  public remainingAmmo = this.maxAmmo;

  public ProjectileType = Bullet12mm;
}
