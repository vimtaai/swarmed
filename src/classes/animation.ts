export abstract class Animation {
  public abstract duration: number;
  protected started: number;

  public get progress(): number {
    return (Date.now() - this.started) / this.duration;
  }

  public get isFinished(): boolean {
    return this.progress >= 1;
  }

  public start() {
    this.started = Date.now();
  }
}
