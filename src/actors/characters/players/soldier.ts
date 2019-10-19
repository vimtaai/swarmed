import { Point } from "../../../classes/point";

import { Player } from "../player";
import { SMG } from "../../weapons/smg";

export class Soldier extends Player {
  public name = "SOLDIER";
  public description = "THE STRONG";
  public radius = 20;
  public moveSpeed = 125;
  public maxHealth = 200;
  public weapon = new SMG(this);
  public health = this.maxHealth;
  protected primaryColor = "#228811";
  protected secondaryColor = "#115500";

  public render() {
    super.render();

    this.translateToRelative();
    this.rotateToRelative();

    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(-2, 0), this.radius * 0.8);

    this.rotateToAbsolute();
    this.translateToAbsolute();
  }
}
