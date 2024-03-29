import { Point } from "../../../classes/point";
import { Layer } from "../../../classes/layer";

import { Player } from "../../../entities/characters/player";
import { SMG } from "../../../entities/weapons/smg";

export class Soldier extends Player {
  public name = "SOLDIER";
  public description = "THE STRONG";
  public radius = 20;
  public moveSpeed = 125;
  public maxHealth = 200;
  public weapon = new SMG(this);
  public health = this.maxHealth;
  public primaryColor = "#228811";
  public secondaryColor = "#115500";

  public render(layer: Layer) {
    super.render(layer);

    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(-2, 0), this.radius * 0.8);
  }
}
