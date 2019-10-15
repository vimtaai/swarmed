import { Point } from "../utils/point";

import { state } from "../state";

import { Stage } from "../stage";
import { Layers } from "../layers";

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
        } else if (event.code === "Enter") {
          state.player = this.playerOptions[this.selectedPlayerOption];
          state.setStage(GameStage);
        }
      }
    }
  ];

  public render() {
    Layers.background.fill("#000000");
    Layers.foreground.setFont(40, "#55aa33");
    Layers.foreground.drawText(new Point(state.size / 2, 100), "ZOMBIES!!4!");
    Layers.foreground.setFont(30);
    Layers.foreground.drawText(new Point(state.size / 2, 300), "SELECT YOUR HERO");

    const playerSelectionStart = new Point(state.size / -200, 450);

    for (let i = 0; i < this.playerOptions.length; i++) {
      const playerOption = this.playerOptions[i];

      playerOption.coords = new Point(state.size / 2 + 100, playerSelectionStart.y + i * 150);
      playerOption.render();
      Layers.foreground.setFont(25, playerOption.primaryColor, "left");
      Layers.foreground.drawText(new Point(playerOption.coords.x - 300, playerOption.coords.y - 20), playerOption.name);
      Layers.foreground.setFont(20, "#ffffff", "left");
      Layers.foreground.drawText(
        new Point(playerOption.coords.x - 300, playerOption.coords.y + 20),
        playerOption.description
      );
    }

    const selectionCoords = new Point(
      state.size / 2 - 250,
      playerSelectionStart.y - 75 + 150 * this.selectedPlayerOption
    );
    Layers.foreground.setStroke(5, "#ff0000");
    Layers.foreground.setFill("transparent");
    Layers.foreground.drawRect(selectionCoords, 500, 150);
  }
}
