import { Point } from "../../../utils/point";

import { Player } from "../player";
import { SMG } from "../weapon/smg";

export class Soldier extends Player {
  protected moveSpeed = 1.5;
  protected maxHealth = 200;

  public name = "SOLDIER";
  public description = "THE STRONG";
  public primaryColor = "#228811";
  public secondaryColor = "#115500";

  public radius = 2.5;
  public health = this.maxHealth;
  public weapon = new SMG(this);

  public draw() {
    super.draw();

    // ! Helmet
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(-0.2, 0), this.radius * 0.8);
  }
}
