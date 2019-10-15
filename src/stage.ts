export interface Stage {
  type: StageType;
  init(): void;
  listenForEvents(): void;
  render(): void;
  next(dt: number): void;
}

export enum StageType {
  MAIN_MENU,
  GAME,
  SCORE_SCREEN
}
