import { Point } from "../classes/point";
import { Layer } from "../classes/layer";
import { Stage } from "../classes/stage";

import { CommonZombie } from "../entities/characters/zombies/common";
import { HulkZombie } from "../entities/characters/zombies/hulk";
import { RunnerZombie } from "../entities/characters/zombies/runner";
import { BoomerZombie } from "../entities/characters/zombies/boomer";
import { Heal } from "../entities/characters/powerups/heal";
import { Shield } from "../entities/characters/powerups/shield";
import { Abberation } from "../entities/characters/bosses/abberation";
import { HealthIndicator } from "../entities/ui-elements/health-indicator";
import { ReloadIndicator } from "../entities/ui-elements/reload-indicator";
import { ScoreIndicator } from "../entities/ui-elements/score-indicator";
import { AmmoIndicator } from "../entities/ui-elements/ammo-indicator";
import { BossIndicator } from "../entities/ui-elements/boss-indicator";

import { ScoreScreenStage } from "../stages/score-screen";

import { state } from "../state";

export class GameStage extends Stage {
  protected layers = {
    back: new Layer(),
    main: new Layer(),
    hud: new Layer()
  };
  protected eventListeners = {
    keydown: (e: KeyboardEvent) => this.handleKeyDown(e),
    keyup: (e: KeyboardEvent) => this.handleKeyUp(e),
    pointerdown: (e: MouseEvent) => this.handleMouseDown(e),
    pointerup: (e: MouseEvent) => this.handleMouseUp(e)
  };
  protected uiElements = [
    new HealthIndicator(),
    new ReloadIndicator(),
    new ScoreIndicator(),
    new AmmoIndicator(),
    new BossIndicator()
  ];

  protected bossTimer: number = Date.now();

  constructor() {
    super();

    state.player.showHealth = true;
    state.zombies = new Set();
    state.powerups = new Set();
    state.explosions = new Set();
    state.boss = new Set();
    state.score = 0;
  }

  public next(dt: number) {
    this.createZombies(dt);
    this.createBosses(dt);

    state.player.next(dt);

    this.nextExplosions(dt);
    this.nextPowerups(dt);

    this.nextBosses(dt);
    this.nextZombies(dt);

    if (state.player.isDead) {
      state.setStage(new ScoreScreenStage());
    }
  }

  public nextPowerups(dt: number) {
    state.powerups.forEach(powerup => {
      if (powerup.collidesWith(state.player)) {
        powerup.activate(state.player);
        state.destroyPowerup(powerup);
      }
    });
  }

  public nextExplosions(dt: number) {
    state.explosions.forEach(explosion => {
      explosion.next(dt);

      if (explosion.isFinished) {
        if (explosion.collidesWith(state.player)) {
          state.player.sufferDamage(explosion.damage);
        }

        state.zombies.forEach(zombie => {
          if (explosion.collidesWith(zombie)) {
            zombie.sufferDamage(explosion.damage);
          }
        });

        state.destroyExplosion(explosion);
      }
    });
  }

  public nextZombies(dt: number) {
    state.zombies.forEach(zombie => {
      zombie.next(dt);

      if (zombie.collidesWith(state.player)) {
        state.player.sufferDamage(zombie.damage);
        state.destroyZombie(zombie);
      }

      state.player.projectiles.forEach(projectile => {
        if (projectile.collidesWith(zombie)) {
          zombie.sufferDamage(projectile.damage);
          state.player.destroyProjectile(projectile);
        }
      });

      if (zombie.isDead) {
        state.destroyZombie(zombie);
        this.createPowerups(zombie.coords);
      }
    });
  }

  public nextBosses(dt: number) {
    state.boss.forEach(boss => {
      boss.next(dt);

      if (boss.collidesWith(state.player)) {
        state.player.sufferDamage(boss.damage);
        return;
      }

      boss.projectiles.forEach(projectile => {
        if (projectile.collidesWith(state.player)) {
          state.player.sufferDamage(projectile.damage);
          boss.destroyProjectile(projectile);
        }
      });

      state.player.projectiles.forEach(projectile => {
        if (projectile.collidesWith(boss)) {
          boss.sufferDamage(projectile.damage);
          state.player.destroyProjectile(projectile);
        }
      });

      if (boss.isDead) {
        state.destroyBoss(boss);
      }
    });
  }

  public render() {
    this.layers.back.fill("#4dbd33");

    state.player.render(this.layers.main);

    state.boss.forEach(boss => boss.render(this.layers.main));
    state.zombies.forEach(zombie => zombie.render(this.layers.main));
    state.powerups.forEach(powerup => powerup.render(this.layers.main));
    state.explosions.forEach(explosion => explosion.render(this.layers.main));
    this.uiElements.forEach(uiElement => uiElement.render(this.layers.main));
  }

  public createBosses(dt: number) {
    const bossSpawnSpeed = 60000;

    if (Date.now() - this.bossTimer >= bossSpawnSpeed) {
      const boss = new Abberation();
      boss.spawn();
      state.boss.add(boss);

      this.bossTimer = Date.now();
    }
  }

  public createZombies(dt: number) {
    const zombieTypes = [CommonZombie, HulkZombie, RunnerZombie, BoomerZombie];

    for (const ZombieType of zombieTypes) {
      if (Math.random() < ZombieType.spawnRate * dt) {
        const newZombie = new ZombieType();

        newZombie.spawn();
        newZombie.face(state.player.coords);

        state.zombies.add(newZombie);
      }
    }
  }

  public createPowerups(point: Point) {
    const powerupTypes = [Heal, Shield];

    for (const PowerupType of powerupTypes) {
      if (Math.random() < PowerupType.dropRate) {
        const newPowerup = new PowerupType(point);

        state.powerups.add(newPowerup);
      }
    }
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      state.player.speed.y = -Layer.toPixels(state.player.moveSpeed);
    } else if (event.code === "KeyS") {
      state.player.speed.y = Layer.toPixels(state.player.moveSpeed);
    } else if (event.code === "KeyA") {
      state.player.speed.x = -Layer.toPixels(state.player.moveSpeed);
    } else if (event.code === "KeyD") {
      state.player.speed.x = Layer.toPixels(state.player.moveSpeed);
    } else if (event.code === "KeyR") {
      state.player.weapon.reload();
    }
  }

  protected handleKeyUp(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      if (state.player.speed.y < 0) state.player.speed.y = 0;
    } else if (event.code === "KeyS") {
      if (state.player.speed.y > 0) state.player.speed.y = 0;
    } else if (event.code === "KeyA") {
      if (state.player.speed.x < 0) state.player.speed.x = 0;
    } else if (event.code === "KeyD") {
      if (state.player.speed.x > 0) state.player.speed.x = 0;
    }
  }

  public handleMouseDown(event: MouseEvent) {
    state.player.weapon.fire();
    state.player.weapon.isFiring = true;
  }

  public handleMouseUp(event: MouseEvent) {
    state.player.weapon.isFiring = false;
  }
}
