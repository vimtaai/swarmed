import { Point } from "../../utils/point";
import { Weapon } from "../weapon";
import { Bullet9mm } from "../characters/projectile/bullet-9mm";

export class Pistol extends Weapon {
  protected length = 15;
  protected width = 6;
  protected primaryColor = "#cccccc";

  public isAutomatic = false;
  public rateOfFire = 150;
  public reloadTime = 1000;
  public maxAmmo = 20;
  public ProjectileType = Bullet9mm;
  public handOffsets = [new Point(0, 0), new Point(0, 0)];

  public ammo = this.maxAmmo;
}
