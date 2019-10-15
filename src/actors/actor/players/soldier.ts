import { Player } from "../player";
import { Weapon } from "../weapon";
import { SMG } from "../weapon/smg";

export class Soldier extends Player {
  protected absoluteSpeed: number = 200;
  protected radius: number = 25;
  protected maxHealth = 200;
  protected primaryColor: string = "#228811";
  protected secondaryColor: string = "#115500";

  public health = this.maxHealth;
  public weapon: Weapon = new SMG(this);

  public render() {
    this.translateToRelative();
    // ! Second hand
    this.context.fillStyle = this.primaryColor;
    this.context.beginPath();
    this.context.arc(this.radius + 15, 0, this.radius / 3, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.translateToAbsolute();

    super.render();

    this.translateToRelative();

    // ! Helmet
    this.context.fillStyle = this.secondaryColor;
    this.context.beginPath();
    this.context.arc(-3, 0, this.radius - 6, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.translateToAbsolute();
  }
}
