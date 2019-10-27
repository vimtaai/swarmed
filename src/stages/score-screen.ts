import { Point } from "../classes/point";
import { Layer } from "../classes/layer";
import { Stage } from "../classes/stage";

import { RestartButton } from "../entities/ui-elements/restart-button";

import { MainMenuStage } from "../stages/main-menu";

import { state } from "../state";

export class ScoreScreenStage extends Stage {
  protected layers = {
    main: new Layer()
  };
  protected eventListeners = {
    mousedown: (e: MouseEvent) => this.handleMouseDown(e)
  };
  protected uiElements = {
    restartButton: new RestartButton()
  };

  public render() {
    this.layers.main.fill("#000000");
    this.layers.main.setStroke("#000000");

    this.layers.main.setFont(50, "#ff0000");
    this.layers.main.drawText(Point.fromPercentage(50, 20), "GAME OVER");

    this.layers.main.setFont(25, "#ffffff");
    this.layers.main.drawText(Point.fromPercentage(50, 50), `YOUR FINAL SCORE: ${state.score}`);

    this.renderUiElements(this.layers.main);
  }

  protected handleMouseDown(event: MouseEvent) {
    if (this.uiElements.restartButton.isHovered) {
      state.setStage(new MainMenuStage());
    }
  }
}
