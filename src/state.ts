import { Point } from "./utils/point";

import { Player } from "./actors/characters/player";
import { Zombie } from "./actors/characters/zombie";

import { Stage } from "./actors/stage";
import { IGameStageState, GameStage } from "./actors/stages/game";
import { IMainMenuState, MainMenuStage } from "./actors/stages/main-menu";
import { IScoreScreenState, ScoreScreenStage } from "./actors/stages/score-screen";

export class State implements IGameStageState, IMainMenuState, IScoreScreenState {
  public mousePosition: Point = Point.fromPercentage(50, 50);
  public stage: Stage;

  public player: Player;
  public zombies: Zombie[];
  public score: number;

  public setStage(StageType: typeof GameStage | typeof MainMenuStage | typeof ScoreScreenStage) {
    this.stage = new StageType();
    this.stage.registerEventListeners();
  }
}

export const state = new State();
