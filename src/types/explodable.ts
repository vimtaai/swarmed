import { Explosion } from "../actors/explosion";

export interface Explodable {
  explosionRadius: number;
  explosionDamage: number;

  createExplosion(): Explosion;
}
