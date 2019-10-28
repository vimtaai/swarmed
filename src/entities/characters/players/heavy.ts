import { Point } from "../../../classes/point";
import { Layer } from "../../../classes/layer";

import { Player } from "../../../entities/characters/player";
import { Rifle } from "../../../entities/weapons/rifle";

export class Heavy extends Player {
  public name = "HEAVY";
  public description = "THE TOUGH";
  public radius = 20;
  public moveSpeed = 100;
  public maxHealth = 400;
  public weapon = new Rifle(this);
  public health = this.maxHealth;
  public primaryColor = "#555588";
  public secondaryColor = "#333355";

  public render(layer: Layer) {
    layer.setStroke("#000000", 0.3);
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(0, 0), this.radius * 1.2);

    super.render(layer);
  }
}
