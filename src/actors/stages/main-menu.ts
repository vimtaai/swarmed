import { Point } from "../../utils/point";

import { state } from "../../state";
import { foreground, background } from "../../layers";

import { Stage } from "../stage";
import { Scout } from "../characters/players/scout";
import { Soldier } from "../characters/players/soldier";
import { Heavy } from "../characters/players/heavy";
import { Player } from "../characters/player";

import { GameStage } from "./game";

export interface IMainMenuState {
  player: Player;
}

export class MainMenuStage extends Stage {
  protected playerOptions: Player[] = [new Scout(), new Soldier(), new Heavy()];
  protected selectedPlayerOption: number = 0;
  protected eventListeners = [
    {
      type: "keydown",
      callback: (event: KeyboardEvent) => {
        if (event.code === "KeyW") {
          this.selectedPlayerOption = (this.selectedPlayerOption - 1 + 3) % 3;
        } else if (event.code === "KeyS") {
          this.selectedPlayerOption = (this.selectedPlayerOption + 1 + 3) % 3;
        } else if (event.code === "Space") {
          state.player = this.playerOptions[this.selectedPlayerOption];
          state.player.coords = Point.fromPercentage(50, 50);
          state.setStage(GameStage);
        }
      }
    }
  ];

  public render() {
    const itemHeight = 100;
    const itemWidth = 500;
    const selectionStart = Point.fromPercentage(50, 35);

    const selectionCoords = selectionStart.shiftXY(-itemWidth / 2, (this.selectedPlayerOption - 0.5) * itemHeight);
    foreground.setStroke("transparent");
    foreground.setFill("#111111");
    foreground.drawRect(selectionCoords, itemWidth, itemHeight);

    background.fill("#000000");
    foreground.setFont(30, "#55aa33");
    foreground.drawText(Point.fromPercentage(50, 10), "ZOMBIE SURROUND");
    foreground.setFont(25);
    foreground.drawText(Point.fromPercentage(50, 20), "SELECT YOUR HERO");

    for (let i = 0; i < this.playerOptions.length; i++) {
      const playerOption = this.playerOptions[i];

      const yOffset = i * itemHeight;
      playerOption.showHealth = false;
      playerOption.coords = selectionStart.shiftXY(itemWidth / 4, yOffset);
      playerOption.render();

      foreground.setFont(22, "#ffffff", "left");
      foreground.drawText(selectionStart.shiftXY(-itemWidth / 3, yOffset - itemHeight / 5), playerOption.name);
      foreground.setFont(20, "#aaaaaa", "left");
      foreground.drawText(selectionStart.shiftXY(-itemWidth / 3, yOffset + itemHeight / 5), playerOption.description);
    }

    foreground.setFont(25, "#ffffff", "center");
    foreground.drawText(Point.fromPercentage(50, 85), "PRESS SPACE TO START");
  }
}
