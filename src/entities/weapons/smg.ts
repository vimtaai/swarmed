import { Point } from "../../classes/point";
import { Weapon } from "../weapon";
import { Bullet9mm } from "../characters/projectile/bullet-9mm";

export class SMG extends Weapon {
  protected length = 35;
  protected width = 8;
  protected primaryColor = "#555555";

  public isAutomatic = true;
  public rateOfFire = 100;
  public reloadTime = 2500;
  public maxAmmo = 30;
  public ProjectileType = Bullet9mm;
  public handOffsets = [new Point(0, -2), new Point(20, 2)];

  public ammo = this.maxAmmo;
}
