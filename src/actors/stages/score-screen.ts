import { Point } from "../../utils/point";

import { state } from "../../state";
import { background, foreground } from "../../layers";

import { Stage } from "../stage";
import { Player } from "../characters/player";

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
    background.fill("#000000");
    foreground.setStroke("#000000");

    foreground.setFont(40, "#ff0000");
    foreground.drawText(Point.fromPercentage(50, 20), "GAME OVER");

    foreground.setFont(25, "#ffffff");
    foreground.drawText(Point.fromPercentage(50, 50), `YOUR FINAL SCORE: ${state.score}`);
    foreground.drawText(Point.fromPercentage(50, 70), "PRESS SPACE TO RESTART");
  }
}
