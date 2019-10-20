import { removeFromArray } from "./utils/array";
import { Explodable } from "./types/explodable";
import { Point } from "./classes/point";

import { Player } from "./actors/characters/player";
import { Zombie } from "./actors/characters/zombie";
import { Boss } from "./actors/characters/boss";
import { Powerup } from "./actors/characters/powerup";
import { Explosion } from "./actors/explosion";
import { Projectile } from "./actors/characters/projectile";
import { Stage } from "./actors/stage";
import { GameStage } from "./actors/stages/game";
import { MainMenuStage } from "./actors/stages/main-menu";
import { ScoreScreenStage } from "./actors/stages/score-screen";

export class State {
  public mousePosition: Point = Point.fromPercentage(50, 50);
  public stage: Stage;

  public player: Player;
  public boss: Boss;
  public zombies: Zombie[];
  public powerups: Powerup[];
  public explosions: Explosion[];
  public score: number;

  public setStage(StageType: typeof GameStage | typeof MainMenuStage | typeof ScoreScreenStage) {
    this.stage = new StageType();
    this.stage.registerEventListeners();
  }

  public destroyZombie(zombie: Zombie | Zombie & Explodable) {
    if ("createExplosion" in zombie) {
      const explosion = zombie.createExplosion();
      state.explosions.push(explosion);
    }

    removeFromArray(state.zombies, zombie);
    state.score += zombie.scoreValue;
  }

  public destroyPowerup(powerup: Powerup) {
    removeFromArray(state.powerups, powerup);
  }

  public destroyExplosion(explosion: Explosion) {
    if (explosion.collidesWith(state.player)) {
      console.log("damage player");
      state.player.sufferDamage(explosion.damage);
    }

    for (const zombie of state.zombies) {
      if (explosion.collidesWith(zombie)) {
        zombie.sufferDamage(explosion.damage);
      }
    }
    removeFromArray(state.explosions, explosion);
  }
}

export const state = new State();
