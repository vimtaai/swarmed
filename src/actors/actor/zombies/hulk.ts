import { Zombie } from "../zombie";

export class HulkZombie extends Zombie {
  protected absoluteSpeed: number = 40;
  protected radius: number = 30;
  protected secondaryColor: string = "#666666";
  protected primaryColor: string = "#444444";

  public damage: number = 50;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }
}
