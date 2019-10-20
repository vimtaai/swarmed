import { Boss } from "../boss";
import { Weapon } from "../../weapon";
import { Spores } from "../../weapons/spores";

export class Abberation extends Boss {
  public weapon: Weapon = new Spores(this);
  public damage: number = 20;
  public scoreValue: number = 200;
  public name: string = "ABBERATION";
  public description: string = "YOUR WORST NIGHTMARE";
  public moveSpeed: number = 30;
  public radius: number = 70;
  public maxHealth: number = 5000;
  public health = this.maxHealth;
  protected primaryColor: string = "#723453";
  protected secondaryColor: string = "#612452";
  protected showHealth: boolean;
}
