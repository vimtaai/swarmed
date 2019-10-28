import { Point } from "../../classes/point";
import { Weapon } from "../weapon";
import { LaserBolt } from "../characters/projectile/laser-bolt";

export class LaserGun extends Weapon {
  protected length = 15;
  protected width = 6;
  protected primaryColor = "#551111";

  public isAutomatic = true;
  public rateOfFire = 2000;
  public reloadTime = 1000;
  public maxAmmo = Infinity;
  public ProjectileType = LaserBolt;
  public handOffsets = [new Point(0, 0), new Point(0, 0)];

  public ammo = this.maxAmmo;
}
