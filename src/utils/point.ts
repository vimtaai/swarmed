import { canvas } from "../canvas";

export class Point {
  public x: number;
  public y: number;

  constructor(xPercent: number, yPercent: number) {
    this.x = canvas.toPixels(xPercent);
    this.y = canvas.toPixels(yPercent);
  }

  public distanceTo(coords: Point): number {
    return canvas.fromPixels(Math.sqrt((this.x - coords.x) ** 2 + (this.y - coords.y) ** 2));
  }

  public facingTo(coords: Point): number {
    return Math.atan2(coords.y - this.y, coords.x - this.x);
  }

  public static add(pointA: Point, pointB: Point) {
    return new Point(canvas.fromPixels(pointA.x + pointB.x), canvas.fromPixels(pointA.y + pointB.y));
  }

  public static fromFacingAndLength(facing: number, length: number, start: Point = new Point(0, 0)) {
    const relativePoint = new Point(Math.cos(facing) * length, Math.sin(facing) * length);

    return Point.add(start, relativePoint);
  }
}
