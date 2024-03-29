import { Point } from "../classes/point";
import { Layer } from "../classes/layer";
import { Stage } from "../classes/stage";

import { CommonZombie } from "../entities/characters/zombies/common";
import { HulkZombie } from "../entities/characters/zombies/hulk";
import { RunnerZombie } from "../entities/characters/zombies/runner";
import { BoomerZombie } from "../entities/characters/zombies/boomer";
import { Heal } from "../entities/characters/powerups/heal";
import { Shield } from "../entities/characters/powerups/shield";
import { AutoTurret } from "../entities/characters/powerups/autoturret";
import { Abberation } from "../entities/characters/bosses/abberation";
import { HealthIndicator } from "../entities/ui-elements/health-indicator";
import { InventoryIndicator } from "../entities/ui-elements/inventory-indicator";
import { ReloadIndicator } from "../entities/ui-elements/reload-indicator";
import { ScoreIndicator } from "../entities/ui-elements/score-indicator";
import { AmmoIndicator } from "../entities/ui-elements/ammo-indicator";
import { BossIndicator } from "../entities/ui-elements/boss-indicator";

import { ScoreScreenStage } from "../stages/score-screen";

import { state } from "../state";
import { Boss } from "../entities/characters/boss";

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
  protected uiElements = {
    inventoryIndicator: new InventoryIndicator(),
    healthIndicator: new HealthIndicator(),
    reloadIndicator: new ReloadIndicator(),
    scoreIndicator: new ScoreIndicator(),
    ammoIndicator: new AmmoIndicator(),
    bossIndicator: new BossIndicator()
  };

  protected bossTimer: number = Date.now();

  constructor() {
    super();

    state.zombies = new Set();
    state.powerups = new Set();
    state.explosions = new Set();
    state.bosses = new Set();
    state.projectiles = new Set();
    state.localPlayer;
    state.score = 0;
  }

  public next(dt: number) {
    this.createZombies(dt);
    this.createBosses(dt);

    this.nextPlayers(dt);
    this.nextZombies(dt);
    this.nextProjectiles(dt);
    this.nextPowerups(dt);
    this.nextExplosions(dt);

    if (state.localPlayer.isDead) {
      state.setStage(new ScoreScreenStage());
    }
  }

  public render() {
    this.layers.back.fill("#4dbd33");

    state.projectiles.forEach(projectile => projectile.renderRelative(this.layers.main));
    state.players.forEach(player => player.renderRelative(this.layers.main));
    state.bosses.forEach(boss => boss.renderRelative(this.layers.main));
    state.zombies.forEach(zombie => zombie.renderRelative(this.layers.main));
    state.powerups.forEach(powerup => powerup.renderRelative(this.layers.main));
    state.explosions.forEach(explosion => explosion.renderRelative(this.layers.main));

    this.renderUiElements(this.layers.hud);
  }

  public nextPlayers(dt: number) {
    state.players.forEach(player => {
      if (player.isDead) {
        state.destroyPlayer(player);
      }

      player.next(dt);
    });
  }

  public nextZombies(dt: number) {
    state.zombies.forEach(zombie => {
      if (zombie.isDead) {
        state.destroyZombie(zombie);

        if (zombie instanceof Boss) {
          this.bossTimer = Date.now();
        }

        this.createPowerups(zombie.coords);
      }

      zombie.next(dt);

      state.players.forEach(player => {
        if (zombie.collidesWith(player)) {
          player.sufferDamage(zombie.damage);
          state.destroyZombie(zombie);
        }
      });
    });
  }

  public nextProjectiles(dt: number) {
    state.projectiles.forEach(projectile => {
      projectile.next(dt);

      projectile.targets.forEach(target => {
        if (projectile.collidesWith(target)) {
          target.sufferDamage(projectile.damage);
          state.destroyProjectile(projectile);
        }
      });
    });
  }

  public nextPowerups(dt: number) {
    state.powerups.forEach(powerup => {
      state.players.forEach(player => {
        if (powerup.collidesWith(player)) {
          powerup.pickup(player);
          state.destroyPowerup(powerup);
        }
      });
    });
  }

  public nextExplosions(dt: number) {
    state.explosions.forEach(explosion => {
      explosion.next(dt);

      if (explosion.isFinished) {
        state.players.forEach(player => {
          if (explosion.collidesWith(player)) {
            player.sufferDamage(explosion.damage);
          }

          state.zombies.forEach(zombie => {
            if (explosion.collidesWith(zombie)) {
              zombie.sufferDamage(explosion.damage);
            }
          });
        });

        state.destroyExplosion(explosion);
      }
    });
  }

  public createBosses(dt: number) {
    const bossSpawnSpeed = 60000;

    if (Date.now() - this.bossTimer >= bossSpawnSpeed) {
      const boss = new Abberation();
      boss.spawn();

      state.zombies.add(boss);
      state.bosses.add(boss);

      this.bossTimer = Infinity;
    }
  }

  public createZombies(dt: number) {
    const zombieTypes = [CommonZombie, HulkZombie, RunnerZombie, BoomerZombie];

    for (const ZombieType of zombieTypes) {
      if (Math.random() < ZombieType.spawnRate * dt) {
        const newZombie = new ZombieType();

        newZombie.spawn();

        state.zombies.add(newZombie);
      }
    }
  }

  public createPowerups(point: Point) {
    const powerupTypes = [Heal, Shield, AutoTurret];

    for (const PowerupType of powerupTypes) {
      if (Math.random() < PowerupType.dropRate) {
        const newPowerup = new PowerupType(point);

        state.powerups.add(newPowerup);
      }
    }
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      state.localPlayer.speed.y = -Layer.toPixels(state.localPlayer.moveSpeed);
    } else if (event.code === "KeyS") {
      state.localPlayer.speed.y = Layer.toPixels(state.localPlayer.moveSpeed);
    } else if (event.code === "KeyA") {
      state.localPlayer.speed.x = -Layer.toPixels(state.localPlayer.moveSpeed);
    } else if (event.code === "KeyD") {
      state.localPlayer.speed.x = Layer.toPixels(state.localPlayer.moveSpeed);
    } else if (event.code === "KeyR") {
      state.localPlayer.weapon.reload();
    } else if (event.code === "Space") {
      if (state.localPlayer.inventory !== null) {
        state.localPlayer.inventory.activate(state.localPlayer);
      }
    }
  }

  protected handleKeyUp(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      if (state.localPlayer.speed.y < 0) state.localPlayer.speed.y = 0;
    } else if (event.code === "KeyS") {
      if (state.localPlayer.speed.y > 0) state.localPlayer.speed.y = 0;
    } else if (event.code === "KeyA") {
      if (state.localPlayer.speed.x < 0) state.localPlayer.speed.x = 0;
    } else if (event.code === "KeyD") {
      if (state.localPlayer.speed.x > 0) state.localPlayer.speed.x = 0;
    }
  }

  public handleMouseDown(event: MouseEvent) {
    state.localPlayer.weapon.fire();
    state.localPlayer.weapon.isFiring = true;
  }

  public handleMouseUp(event: MouseEvent) {
    state.localPlayer.weapon.isFiring = false;
  }
}
