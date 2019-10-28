import { Point } from "../../../classes/point";
import { Layer } from "../../../classes/layer";

import { Projectile } from "../../../entities/characters/projectile";

export class Spore extends Projectile {
  public name = "SPORE";
  public description = "ZOMBIE FUNGUS THAT DEALS MODERATE DAMAGE";
  public radius = 10;
  public moveSpeed = 200;
  public damage = 20;
  public primaryColor = "#92b045";
  public secondaryColor = "rgba(170, 196, 104, 0.5)";
  public outlineColor = "#75912d";
  protected trailLength = 4;

  public renderTrail(layer: Layer) {
    layer.setStroke("transparent", 0);
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(0, 0), this.radius + this.trailLength);
  }
}
