import { Point } from "../utils/point";

import { state } from "../state";
import { canvas } from "../canvas";
import { layers } from "../layers";

import { Stage } from "../stage";
import { Scout } from "../actors/characters/players/scout";
import { Soldier } from "../actors/characters/players/soldier";
import { Heavy } from "../actors/characters/players/heavy";
import { Player } from "../actors/characters/player";

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
          state.setStage(GameStage);
        }
      }
    }
  ];

  public render() {
    const selectionStart = 40;
    const itemHeight = 15;

    const selectionCoords = new Point(25, selectionStart - itemHeight / 2 + itemHeight * this.selectedPlayerOption);
    layers.foreground.setStroke("transparent");
    layers.foreground.setFill("#111111");
    layers.foreground.drawRect(selectionCoords, 50, itemHeight);

    layers.background.fill("#000000");
    layers.foreground.setFont(4, "#55aa33");
    layers.foreground.drawText(new Point(50, 10), "ZOMBIES!!4!");
    layers.foreground.setFont(3);
    layers.foreground.drawText(new Point(50, 25), "SELECT YOUR HERO");

    for (let i = 0; i < this.playerOptions.length; i++) {
      const playerOption = this.playerOptions[i];

      const yOffset = selectionStart + i * itemHeight;
      playerOption.coords = new Point(65, yOffset);
      playerOption.render();

      layers.foreground.setFont(2.8, playerOption.primaryColor, "left");
      layers.foreground.drawText(new Point(30, yOffset - 2), playerOption.name);
      layers.foreground.setFont(2.2, "#ffffff", "left");
      layers.foreground.drawText(new Point(30, yOffset + 2), playerOption.description);
    }

    layers.foreground.setFont(3, "#ffffff", "center");
    layers.foreground.drawText(new Point(50, 85), "PRESS SPACE TO START");
  }
}
