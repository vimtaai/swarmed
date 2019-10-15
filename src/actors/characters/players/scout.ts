import { Point } from "../../../utils/point";
import { Player } from "../player";
import { Weapon } from "../weapon";
import { Pistol } from "../weapon/pistol";

export class Scout extends Player {
  protected absoluteSpeed: number = 350;
  protected radius: number = 20;
  protected maxHealth = 150;

  public name = "SCOUT";
  public description = "THE NIMBLE";
  public primaryColor: string = "#558800";
  public secondaryColor: string = "#335500";

  public health = this.maxHealth;
  public weapon: Weapon = new Pistol(this);

  public render() {
    this.translateToRelative();

    // ! Backpack
    this.layer.setStroke(2, "#000000");
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(-this.radius + 5, 0), this.radius - 6);

    this.translateToAbsolute();

    super.render();
  }
}
