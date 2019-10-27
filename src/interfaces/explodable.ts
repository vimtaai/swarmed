import { Explosion } from "../entities/explosion";

export interface Explodable {
  explode(): Explosion;
}
