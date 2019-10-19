import { Point } from "./classes/point";

import { Player } from "./actors/characters/player";
import { Zombie } from "./actors/characters/zombie";
import { Powerup } from "./actors/characters/powerup";
import { Explosion } from "./actors/explosion";

import { Stage } from "./actors/stage";
import { GameStage } from "./actors/stages/game";
import { MainMenuStage } from "./actors/stages/main-menu";
import { ScoreScreenStage } from "./actors/stages/score-screen";

export class State {
  public mousePosition: Point = Point.fromPercentage(50, 50);
  public stage: Stage;

  public player: Player;
  public zombies: Zombie[];
  public powerups: Powerup[];
  public explosions: Explosion[];
  public score: number;

  public setStage(StageType: typeof GameStage | typeof MainMenuStage | typeof ScoreScreenStage) {
    this.stage = new StageType();
    this.stage.registerEventListeners();
  }
}

export const state = new State();
