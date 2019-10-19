import { Point } from "../classes/point";
import { UIElement } from "../types/renderable/ui-element";

import { state } from "../state";

export class AmmoIndicator extends UIElement {
  public render() {
    const ammoLabel = `${state.player.weapon.ammo}/${state.player.weapon.maxAmmo}`;
    this.layer.setFont(25, state.player.weapon.isReloading ? "#ff0000" : "ffffff", "right");
    this.layer.drawTextWithOutline(Point.fromPercentage(98, 95), ammoLabel);
  }
}
