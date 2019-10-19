export abstract class Animation {
  public abstract duration: number;
  protected started: number;

  public get isFinished(): boolean {
    return Date.now() - this.started >= this.duration;
  }

  public start() {
    this.started = Date.now();
  }
}
