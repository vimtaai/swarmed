import { Layer } from "../classes/layer";

export interface Renderable {
  render(layer: Layer): void;
}
