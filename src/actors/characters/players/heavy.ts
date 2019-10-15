import { Point } from "../../../utils/point";

import { Player } from "../player";
import { Rifle } from "../weapon/rifle";

export class Heavy extends Player {
  protected moveSpeed = 1;
  protected maxHealth = 400;

  public name = "HEAVY";
  public description = "THE TOUGH";
  public primaryColor = "#555588";
  public secondaryColor = "#333355";

  public radius = 3;
  public health = this.maxHealth;
  public weapon = new Rifle(this);

  public draw() {
    // ! Armor
    this.layer.setStroke("#000000");
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(0, 0), this.radius * 1.1);

    super.draw();
  }
}
