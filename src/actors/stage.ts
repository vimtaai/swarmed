import { Renderable } from "../types/renderable";
import { Nextable } from "../types/nextable";
import { UIElement } from "../types/renderable/ui-element";
import { EventListener } from "../classes/event-listener";

export abstract class Stage implements Renderable, Nextable {
  protected uiElements: UIElement[] = [];
  protected eventListeners: EventListener[] = [];
  protected areEventListenersRegistered: boolean = false;

  public abstract render(): void;

  public next(dt: number) {}

  public registerEventListeners() {
    if (this.areEventListenersRegistered) {
      return;
    }

    for (const eventListener of this.eventListeners) {
      eventListener.listen(this);
    }

    this.areEventListenersRegistered = true;
  }
}
