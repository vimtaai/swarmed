import { Layer } from "../../classes/layer";

import { Player } from "../../entities/characters/player";

export abstract class Turret extends Player {
  public showHealth = true;

  public next(dt: number) {
    super.next(dt);
  }

  public render(layer: Layer) {
    this.renderWeapon(layer);
    super.render(layer);
  }

  public renderWeapon(layer: Layer) {
    this.weapon.render(layer);
  }
}
