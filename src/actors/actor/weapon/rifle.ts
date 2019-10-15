import { Weapon } from "../weapon";
import { Bullet } from "../projectile/bullet";

export class Rifle extends Weapon {
  public width: number = 70;
  public height: number = 6;
  public primaryColor: string = "#882200";

  public rateOfFire: number = 300;
  public reloadTime: number = 2000;
  public maxAmmo: number = 10;
  public remainingAmmo: number = this.maxAmmo;

  public ProjectileType: typeof Bullet = Bullet;
}
