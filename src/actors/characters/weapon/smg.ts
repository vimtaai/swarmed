import { Weapon } from "../weapon";
import { Bullet } from "../projectile/bullet";

export class SMG extends Weapon {
  public width: number = 55;
  public height: number = 6;
  public primaryColor: string = "#555555";

  public rateOfFire: number = 50;
  public reloadTime: number = 2500;
  public maxAmmo: number = 50;
  public remainingAmmo: number = this.maxAmmo;

  public ProjectileType: typeof Bullet = Bullet;
}
