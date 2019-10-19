import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { Renderable } from "../renderable";

import { state } from "../../state";
import { ui } from "../../layers";

export abstract class UIElement implements Renderable {
  protected layer: Layer = ui;

  public get isHovered(): boolean {
    return this.isWithinBoundaries(state.mousePosition);
  }

  public abstract render(): void;

  public isWithinBoundaries(point: Point): boolean {
    return false;
  }
}
