import { Point } from "../../utils/point";
import { Weapon } from "../weapon";
import { Bullet12mm } from "../characters/projectile/bullet-12mm";

export class Rifle extends Weapon {
  protected length = 50;
  protected width = 8;
  protected primaryColor = "#882200";

  public isAutomatic = false;
  public rateOfFire = 300;
  public reloadTime = 1500;
  public maxAmmo = 12;
  public ProjectileType = Bullet12mm;
  public handOffsets = [new Point(0, -2), new Point(30, 2)];

  public ammo = this.maxAmmo;
}
