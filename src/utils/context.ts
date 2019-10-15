export function clearContext(context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

export function fillBackground(context: CanvasRenderingContext2D, color: string) {
  context.fillStyle = color;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

export function drawText(context: CanvasRenderingContext2D, text: string, x, y) {
  context.fillText(text, x, y);
  context.strokeText(text, x, y);
}
