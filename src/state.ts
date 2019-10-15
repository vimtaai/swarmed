import { Player } from "./actors/characters/player";
import { Zombie } from "./actors/characters/zombie";

import { Stage } from "./stage";
import { IGameStageState } from "./stages/game";
import { IMainMenuState } from "./stages/main-menu";
import { IScoreScreenState } from "./stages/score-screen";

export class State implements IGameStageState, IMainMenuState, IScoreScreenState {
  public stage: Stage;
  public size: number;
  public scale: number;

  public player: Player;
  public zombies: Zombie[];

  public setStage(StageType: typeof Stage) {
    this.stage = new StageType();
    this.stage.init();
    this.stage.registerEventListeners();
  }
}

export const state = new State();
