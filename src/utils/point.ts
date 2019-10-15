export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public distanceTo(coords: Point): number {
    return Math.sqrt((this.x - coords.x) ** 2 + (this.y - coords.y) ** 2);
  }

  public facingTo(coords: Point): number {
    return Math.atan2(coords.y - this.y, coords.x - this.x);
  }

  public static fromFacingAndLength(facing: number, length: number, start: Point = new Point(0, 0)) {
    const x = Math.cos(facing) * length + start.x;
    const y = Math.sin(facing) * length + start.y;

    return new Point(x, y);
  }
}
