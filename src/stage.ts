import { EventListener } from "./utils/event-listener";

export class Stage {
  private areEventListenersRegistered: boolean = false;
  protected eventListeners: EventListener[] = [];

  public init() {}
  public next(dt: number) {}
  public render() {}

  public registerEventListeners() {
    const root = document.querySelector("canvas");

    if (this.areEventListenersRegistered) {
      return;
    }

    for (const eventListener of this.eventListeners) {
      addEventListener(eventListener.type, eventListener.callback, false);
    }

    this.areEventListenersRegistered = true;
  }
}
