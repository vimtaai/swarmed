import { Point } from "../../../classes/point";
import { Layer } from "../../../classes/layer";

import { Player } from "../../../entities/characters/player";
import { Pistol } from "../../../entities/weapons/pistol";

export class Scout extends Player {
  public name = "SCOUT";
  public description = "THE NIMBLE";
  public radius = 15;
  public moveSpeed = 150;
  public maxHealth = 150;
  public weapon = new Pistol(this);
  public health = this.maxHealth;
  protected primaryColor = "#558800";
  protected secondaryColor = "#335500";

  public render(layer: Layer) {
    this.translateToRelative(layer);
    this.rotateToRelative(layer);

    layer.setStroke("#000000");
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(-this.radius * 0.6, 0), this.radius * 0.8);

    this.rotateToAbsolute(layer);
    this.translateToAbsolute(layer);

    super.render(layer);
  }
}