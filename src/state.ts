import { Explodable } from "./interfaces/explodable";

import { Point } from "./classes/point";
import { Stage } from "./classes/stage";

import { Player } from "./entities/characters/player";
import { Zombie } from "./entities/characters/zombie";
import { Boss } from "./entities/characters/boss";
import { Powerup } from "./entities/characters/powerup";
import { Explosion } from "./entities/explosion";

export class State {
  public mousePosition: Point = Point.fromPercentage(50, 50);
  public stage: Stage;

  public player: Player;
  public boss: Set<Boss>;
  public zombies: Set<Zombie>;
  public powerups: Set<Powerup>;
  public explosions: Set<Explosion>;
  public score: number;

  public setStage(stage: Stage) {
    this.stage = stage;
    this.stage.registerEventListeners();
  }

  public destroyZombie(zombie: Zombie | Zombie & Explodable) {
    if ("explode" in zombie) {
      const explosion = zombie.explode();
      state.explosions.add(explosion);
    }

    state.zombies.delete(zombie);
    state.score += zombie.scoreValue;
  }

  public destroyBoss(boss: Boss) {
    state.boss.delete(boss);
    state.score += boss.scoreValue;
  }

  public destroyPowerup(powerup: Powerup) {
    state.powerups.delete(powerup);
  }

  public destroyExplosion(explosion: Explosion) {
    state.explosions.delete(explosion);
  }
}

export const state = new State();
