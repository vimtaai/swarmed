import { Renderable } from "../interfaces/renderable";
import { Nextable } from "../interfaces/nextable";
import { UIElement } from "./ui-element";
import { Layer } from "./layer";
import { state } from "../state";

export abstract class Stage implements Renderable, Nextable {
  protected layers: { [name: string]: Layer } = {};
  protected eventListeners: { [type: string]: (event: Event) => void } = {};
  protected areEventListenersRegistered: boolean = false;
  protected uiElements: UIElement[] = [];

  public abstract render(): void;

  public next(dt: number) {}

  public clearLayers(): void {
    for (const layerName in this.layers) {
      const layer = this.layers[layerName];
      layer.clear();
    }
  }

  public registerEventListeners() {
    if (this.areEventListenersRegistered) {
      return;
    }

    for (const eventType in this.eventListeners) {
      const eventListener = this.eventListeners[eventType];

      window.addEventListener(eventType, (event: Event) => {
        if (state.stage !== this) {
          return;
        }

        event.preventDefault();
        eventListener.call(this, event);
      });
    }

    this.areEventListenersRegistered = true;
  }
}
