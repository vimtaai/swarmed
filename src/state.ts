import { Explodable } from "./interfaces/explodable";

import { Point } from "./classes/point";
import { Stage } from "./classes/stage";

import { Explosion } from "./entities/explosion";
import { Player } from "./entities/characters/player";
import { Zombie } from "./entities/characters/zombie";
import { Boss } from "./entities/characters/boss";
import { Powerup } from "./entities/characters/powerup";
import { Projectile } from "./entities/characters/projectile";

export class State {
  public mousePosition: Point = Point.fromPercentage(50, 50);
  public stage: Stage;

  public player: Set<Player>;
  public zombies: Set<Zombie>;
  public bosses: Set<Boss>;
  public projectiles: Set<Projectile>;
  public powerups: Set<Powerup>;
  public explosions: Set<Explosion>;
  public localPlayer: Player;

  public score: number;

  public setStage(stage: Stage) {
    this.stage = stage;
    this.stage.registerEventListeners();
  }

  public destroyZombie(zombie: Zombie | Zombie & Explodable) {
    if ("explode" in zombie) {
      const explosion = zombie.explode();
      this.explosions.add(explosion);
    }

    if (zombie instanceof Boss) {
      this.bosses.delete(zombie);
    }

    this.zombies.delete(zombie);
    this.score += zombie.scoreValue;
  }

  public destroyBoss(boss: Boss) {
    this.zombies.delete(boss);
    this.bosses.delete(boss);
    this.score += boss.scoreValue;
  }

  public destroyProjectile(projectile: Projectile) {
    this.projectiles.delete(projectile);
  }

  public destroyPowerup(powerup: Powerup) {
    this.powerups.delete(powerup);
  }

  public destroyExplosion(explosion: Explosion) {
    this.explosions.delete(explosion);
  }
}

export const state = new State();
