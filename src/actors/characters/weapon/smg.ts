import { Point } from "../../../utils/point";
import { Weapon } from "../weapon";
import { Bullet9mm } from "../projectile/bullet-9mm";

export class SMG extends Weapon {
  public length = 6;
  public width = 1;
  public primaryColor = "#555555";

  public handOffsets = [new Point(0, 0), new Point(2, 0.2)];
  public rateOfFire = 50;
  public reloadTime = 2500;
  public maxAmmo = 50;
  public remainingAmmo = this.maxAmmo;

  public ProjectileType = Bullet9mm;
}
