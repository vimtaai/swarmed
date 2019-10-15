import { Weapon } from "../weapon";
import { Bullet } from "../projectile/bullet";

export class Pistol extends Weapon {
  public width: number = 40;
  public height: number = 6;
  public primaryColor: string = "#cccccc";

  public rateOfFire: number = 100;
  public reloadTime: number = 1000;
  public maxAmmo: number = 20;
  public remainingAmmo: number = this.maxAmmo;

  public ProjectileType: typeof Bullet = Bullet;
}
