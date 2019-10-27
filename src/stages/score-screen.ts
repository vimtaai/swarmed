import { Point } from "../classes/point";
import { Layer } from "../classes/layer";
import { Stage } from "../classes/stage";

import { MainMenuStage } from "../stages/main-menu";

import { state } from "../state";

export class ScoreScreenStage extends Stage {
  protected layers = {
    main: new Layer()
  };
  protected eventListeners = {
    keydown: (e: KeyboardEvent) => this.handleKeyDown(e)
  };

  public render() {
    this.layers.main.fill("#000000");
    this.layers.main.setStroke("#000000");

    this.layers.main.setFont(50, "#ff0000");
    this.layers.main.drawText(Point.fromPercentage(50, 20), "GAME OVER");

    this.layers.main.setFont(25, "#ffffff");
    this.layers.main.drawText(Point.fromPercentage(50, 50), `YOUR FINAL SCORE: ${state.score}`);
    this.layers.main.drawText(Point.fromPercentage(50, 70), "PRESS SPACE TO RESTART");
  }

  protected handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Space") {
      state.setStage(new MainMenuStage());
    }
  }
}
