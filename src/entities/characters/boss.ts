import { Layer } from "../../classes/layer";

import { Zombie } from "./zombie";
import { Weapon } from "../weapon";

export abstract class Boss extends Zombie {
  public abstract weapon: Weapon;
  public showHealth = false;

  public next(dt: number) {
    super.next(dt);

    if (this.weapon.canAutoFire) {
      this.weapon.fire();
    }
  }

  public render(layer: Layer) {
    this.renderWeapon(layer);
    super.render(layer);
  }

  public renderWeapon(layer: Layer) {
    this.weapon.render(layer);
  }
}
