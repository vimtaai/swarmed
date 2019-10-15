import { Point } from "../utils/point";

import { state } from "../state";
import { Stage } from "../stage";

import { Player } from "../actors/characters/player";
import { Layers } from "../layers";

export interface IScoreScreenState {
  player: Player;
}

export class ScoreScreenStage extends Stage {
  public init() {
    return;
  }

  public next(dt: number) {
    return;
  }

  public render() {
    Layers.background.fill("#000000");
    Layers.foreground.setStroke(2, "#000000");

    Layers.foreground.setFont(50, "#ff0000");
    Layers.foreground.drawText(new Point(state.size / 2, 100), "GAME OVER");

    Layers.foreground.setFont(30, "#ffffff");
    Layers.foreground.drawText(new Point(state.size / 2, 300), `YOUR FINAL SCORE: ${state.player.score}`);
  }

  public registerEventListeners() {
    return;
  }
}
