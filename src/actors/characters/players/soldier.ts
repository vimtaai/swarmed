import { Point } from "../../../utils/point";
import { Player } from "../player";
import { Weapon } from "../weapon";
import { SMG } from "../weapon/smg";

export class Soldier extends Player {
  protected absoluteSpeed: number = 200;
  protected radius: number = 25;
  protected maxHealth = 200;

  public name = "SOLDIER";
  public description = "THE STRONG";
  public primaryColor: string = "#228811";
  public secondaryColor: string = "#115500";

  public health = this.maxHealth;
  public weapon: Weapon = new SMG(this);

  public render() {
    this.translateToRelative();

    // ! Second hand
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(new Point(this.radius + 15, 0), this.radius / 3);

    this.translateToAbsolute();

    super.render();

    this.translateToRelative();

    // ! Helmet
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(-3, 0), this.radius - 6);

    this.translateToAbsolute();
  }
}
