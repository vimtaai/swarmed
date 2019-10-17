import { Point } from "../../../utils/point";

import { Player } from "../player";
import { SMG } from "../../weapons/smg";

export class Soldier extends Player {
  protected primaryColor = "#228811";
  protected secondaryColor = "#115500";

  public name = "SOLDIER";
  public description = "THE STRONG";
  public radius = 20;
  public moveSpeed = 125;
  public maxHealth = 200;
  public weapon = new SMG(this);

  public health = this.maxHealth;

  public draw() {
    super.draw();

    // ! Helmet
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(-2, 0), this.radius * 0.8);
  }
}
