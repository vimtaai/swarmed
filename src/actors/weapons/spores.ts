import { Point } from "../../classes/point";
import { Weapon } from "../weapon";
import { Spore } from "../characters/projectile/spore";

export class Spores extends Weapon {
  public isAutomatic = true;
  public rateOfFire = 1500;
  public reloadTime = 2500;
  public maxAmmo = Infinity;
  public ProjectileType = Spore;
  public handOffsets = [new Point(0, -2), new Point(0, 2)];
  public ammo = this.maxAmmo;
  public isFiring = true;
  protected length = 0;
  protected width = 30;
  protected primaryColor = "#75912d";

  public render() {
    this.layer.setStroke("transparent");
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(new Point(50, 0), this.width);
  }
}
