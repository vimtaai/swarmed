import { Zombie } from "../zombie";

export class HulkZombie extends Zombie {
  protected absoluteSpeed: number = 40;
  protected radius: number = 30;

  public secondaryColor: string = "#666666";
  public primaryColor: string = "#444444";

  public damage: number = 50;
}
