import { Point } from "../../../classes/point";
import { Layer } from "../../../classes/layer";

import { Turret } from "../turret";
import { Weapon } from "../../weapon";
import { LaserGun } from "../../weapons/laser-gun";

import { state } from "../../../state";

export class LaserTurret extends Turret {
  public name: string = "AUTO TURRET";
  public description: string = "YOUR WORST NIGHTMARE";
  public moveSpeed: number = 30;
  public radius: number = 20;
  public maxHealth: number = 100;
  public health = this.maxHealth;
  public weapon: Weapon = new LaserGun(this);
  public primaryColor = "#d05050";
  public secondaryColor = "#300000";

  public constructor() {
    super();
    this.weapon.isFiring = true;
  }

  public next(dt: number) {
    const closestZombie = this.closestCharacter(state.zombies);

    if (!closestZombie) {
      return;
    }

    this.face(closestZombie.coords);

    if (this.weapon.canAutoFire) {
      this.weapon.fire();
    }
  }

  public render(layer: Layer) {
    super.render(layer);

    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(0, 0), this.radius * 0.8);
  }

  public renderHands() {}
}
