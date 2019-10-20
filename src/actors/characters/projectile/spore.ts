import { Projectile } from "../projectile";
import { Point } from "../../../classes/point";

export class Spore extends Projectile {
  public name = "SPORE";
  public description = "ZOMBIE FUNGUS THAT DEALS MODERATE DAMAGE";
  public radius = 10;
  public moveSpeed = 200;
  public damage = 20;
  protected primaryColor = "#92b045";
  protected secondaryColor = "rgba(170, 196, 104, 0.5)";
  protected outlineColor = "#75912d";
  protected trailLength = 4;

  public renderTrail() {
    this.translateToRelative();
    this.rotateToRelative();

    this.layer.setStroke("transparent", 0);
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(0, 0), this.radius + this.trailLength);

    this.rotateToAbsolute();
    this.translateToAbsolute();
  }
}
