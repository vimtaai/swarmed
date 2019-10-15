const backgroundCanvas: HTMLCanvasElement = document.querySelector("#background");
const foregroundCanvas: HTMLCanvasElement = document.querySelector("#foreground");

backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

foregroundCanvas.width = window.innerWidth;
foregroundCanvas.height = window.innerHeight;

export const background: CanvasRenderingContext2D = backgroundCanvas.getContext("2d");
export const foreground: CanvasRenderingContext2D = foregroundCanvas.getContext("2d");
