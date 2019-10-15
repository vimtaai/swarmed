import { EventListener } from "./utils/event-listener";
import { state } from "./state";

export class Stage {
  private areEventListenersRegistered: boolean = false;
  protected eventListeners: EventListener[] = [];

  public init() {}
  public next(dt: number) {}
  public render() {}

  public registerEventListeners() {
    if (this.areEventListenersRegistered) {
      return;
    }

    for (const eventListener of this.eventListeners) {
      const thisStage = this;
      addEventListener(eventListener.type, function(event: Event) {
        if (state.stage === thisStage) {
          event.preventDefault();
          eventListener.callback.call(event.target, event);
        }
      });
    }

    this.areEventListenersRegistered = true;
  }
}
