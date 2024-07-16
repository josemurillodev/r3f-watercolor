export default class Particles {
  ctx: CanvasRenderingContext2D;

  x: number;

  y: number;

  speedx: number;

  speedy: number;

  size: number;

  hue = 0;

  constructor(ctx: CanvasRenderingContext2D, mouse: { x: number; y: number }, hue = 0) {
    this.x = mouse.x;
    this.y = mouse.y;
    this.ctx = ctx;
    this.size = Math.random() * 5 + 1;
    this.speedx = Math.random() * 3 - 1.5;
    this.speedy = Math.random() * 3 - 1.5;
    this.hue = hue;
  }

  update() {
    this.x += this.speedx;
    this.y += this.speedy;
    if (this.size > 0) {
      this.size -= 0.1;
    }
  }

  draw() {
    this.ctx.fillStyle = `hsla(${this.hue},80%,50%,1)`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, 6);
    this.ctx.fill();
  }
}
