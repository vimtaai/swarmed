import { Point } from "../../classes/point";
import { EventListener } from "../../classes/event-listener";

import { Stage } from "../stage";
import { MainMenuStage } from "./main-menu";

import { state } from "../../state";
import { background, foreground } from "../../layers";

export class ScoreScreenStage extends Stage {
  protected eventListeners = [new EventListener("keydown", (e: KeyboardEvent) => this.handleKeyDown(e))];

  public render() {
    background.fill("#000000");
    foreground.setStroke("#000000");

    foreground.setFont(50, "#ff0000");
    foreground.drawText(Point.fromPercentage(50, 20), "GAME OVER");

    foreground.setFont(25, "#ffffff");
    foreground.drawText(Point.fromPercentage(50, 50), `YOUR FINAL SCORE: ${state.score}`);
    foreground.drawText(Point.fromPercentage(50, 70), "PRESS SPACE TO RESTART");
  }

  protected handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Space") {
      state.setStage(MainMenuStage);
    }
  }
}
