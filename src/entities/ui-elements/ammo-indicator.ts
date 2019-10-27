import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { state } from "../../state";

export class AmmoIndicator extends UIElement {
  public render(layer: Layer) {
    const ammoLabel = `${state.player.weapon.ammo}/${state.player.weapon.maxAmmo}`;

    layer.setFont(25, state.player.weapon.isReloading ? "#ff0000" : "ffffff", "right");
    layer.drawTextWithOutline(Point.fromPercentage(98, 95), ammoLabel);
  }
}
