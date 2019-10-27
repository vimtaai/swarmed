import { Point } from "../../classes/point";
import { Weapon } from "../weapon";
import { Spore } from "../characters/projectile/spore";
import { Layer } from "../../classes/layer";

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

  public render(layer: Layer) {
    layer.setStroke("transparent");
    layer.setFill(this.primaryColor);
    layer.drawArc(new Point(50, 0), this.width);
  }
}
