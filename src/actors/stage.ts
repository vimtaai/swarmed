import { Actor } from "../utils/actor";
import { EventListener } from "../utils/event-listener";

import { state } from "../state";

export abstract class Stage extends Actor {
  protected abstract eventListeners: EventListener[];
  protected areEventListenersRegistered: boolean = false;

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
