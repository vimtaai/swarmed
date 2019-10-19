import { Stage } from "../actors/stage";

import { state } from "../state";

export class EventListener {
  public type: string;
  public callback: (event: Event) => void;

  constructor(type: string, callback: (event: Event) => void) {
    this.type = type;
    this.callback = callback;
  }

  public listen(stage: Stage) {
    const self = this;

    window.addEventListener(this.type, function(event: Event) {
      if (state.stage !== stage) {
        return;
      }

      event.preventDefault();
      self.callback.call(event.target, event);
    });
  }
}
