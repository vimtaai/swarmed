import { Point } from "../utils/point";

import { state } from "../state";
import { Stage } from "../stage";

import { Player } from "../actors/characters/player";
import { layers } from "../layers";
import { MainMenuStage } from "./main-menu";

export interface IScoreScreenState {
  player: Player;
}

export class ScoreScreenStage extends Stage {
  protected eventListeners = [
    {
      type: "keydown",
      callback: (event: KeyboardEvent) => {
        if (event.code === "Space") {
          state.setStage(MainMenuStage);
        }
      }
    }
  ];
  public render() {
    layers.background.fill("#000000");
    layers.foreground.setStroke("#000000");

    layers.foreground.setFont(5, "#ff0000");
    layers.foreground.drawText(new Point(50, 20), "GAME OVER");

    layers.foreground.setFont(3, "#ffffff");
    layers.foreground.drawText(new Point(50, 50), `YOUR FINAL SCORE: ${state.score}`);
    layers.foreground.drawText(new Point(50, 70), "PRESS SPACE TO RESTART");
  }
}
