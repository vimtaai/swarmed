import { Renderable } from "../interfaces/renderable";

import { Point } from "../classes/point";
import { Layer } from "../classes/layer";

import { state } from "../state";

export abstract class UIElement implements Renderable {
  public get isHovered(): boolean {
    return this.isWithinBoundaries(state.mousePosition);
  }

  public abstract render(layer: Layer): void;

  public isWithinBoundaries(point: Point): boolean {
    return false;
  }
}
