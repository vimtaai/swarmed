import { Point } from "../../../utils/point";

import { Player } from "../player";
import { Rifle } from "../../weapons/rifle";

export class Heavy extends Player {
  protected primaryColor = "#555588";
  protected secondaryColor = "#333355";

  public name = "HEAVY";
  public description = "THE TOUGH";
  public radius = 20;
  public moveSpeed = 100;
  public maxHealth = 400;
  public weapon = new Rifle(this);

  public health = this.maxHealth;

  public draw() {
    // ! Armor
    this.layer.setStroke("#000000", 0.3);
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(0, 0), this.radius * 1.2);

    super.draw();
  }
}
