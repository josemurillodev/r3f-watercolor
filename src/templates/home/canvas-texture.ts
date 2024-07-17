/* eslint-disable no-plusplus */
import { CanvasTexture, NearestFilter } from 'three';
import Particles from './canvas-particle';
import { noop } from '@/helpers/helper-util';

class CustomCanvasTexture {
  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  instance: CanvasTexture;

  width = 1;

  height = 256;

  visible = true;

  hue = 0;

  speed = 10;

  cycles = 3;

  spread = 3;

  size = 5;

  mouse = {
    x: -80,
    y: -80,
  };

  points: Particles[] = [];

  constructor(w = 1, h = 256) {
    this.canvas = document.createElement('canvas');
    this.width = w;
    this.height = h;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    // this.canvas.style.zIndex = '2';
    // this.canvas.style.mixBlendMode = 'darken';
    // this.canvas.style.opacity = '0.5';
    // this.canvas.style.opacity = '0.00001';
    this.canvas.style.backgroundColor = 'rgba(250,250,250,1)';
    this.context = this.canvas.getContext('2d')!;
    document.body.append(this.canvas);

    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.instance = new CanvasTexture(this.canvas);
    this.instance.magFilter = NearestFilter;
    this.context.globalAlpha = 1;
    this.context.fillStyle = 'rgba(250,250,250,1)';
    this.context.fillRect(0, 0, this.width, this.height);

    document.addEventListener('pointermove', this.pointerMove);
  }

  pointerMove = (e: PointerEvent) => {
    this.mouse = {
      x: e.x,
      y: e.y,
    };
    // this.points.push(new Particles(this.context, this.mouse, this.hue));
    for (let i = 0; i < this.cycles; i++) {
      this.points.push(
        new Particles(this.context, this.mouse, this.hue, this.size, this.spread)
      );
    }
    // this.hue += 0.1;
  };

  update = (delta?: number) => {
    this.context.fillStyle = 'rgba(250,250,250,1)';
    this.context.fillRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.points.length; i += 1) {
      this.points[i].update();
      this.points[i].draw();
      if (this.points[i].size <= 0.1) {
        this.points.splice(i, 1);
        --i;
      }
    }
    if (delta) {
      this.hue += delta * this.speed;
    }

    // Update texture instance
    this.instance.needsUpdate = true;
  };

  dispose = () => {
    document.body.removeChild(this.canvas);
    // TODO

    document.removeEventListener('pointermove', this.pointerMove);
  };

  getLevaConfig = (cb = noop) => ({
    canvas: {
      value: this.visible,
      onChange: (v: boolean) => {
        this.visible = v;
        if (this.visible) {
          this.canvas.style.zIndex = '2';
        } else {
          this.canvas.style.zIndex = '0';
        }
      },
    },
    particles: {
      value: 3,
      min: 1,
      max: 10,
      step: 1,
      onChange: (v: number) => {
        this.cycles = v;
        this.update();
        cb();
      },
    },
    size: {
      value: 5,
      min: 1,
      max: 20,
      step: 0.0001,
      onChange: (v: number) => {
        this.size = v;
        this.update();
        cb();
      },
    },
    speed: {
      value: 10,
      min: 1,
      max: 100,
      step: 0.0001,
      onChange: (v: number) => {
        this.speed = v;
        this.update();
        cb();
      },
    },
    spread: {
      value: 3,
      min: 1,
      max: 10,
      step: 0.0001,
      onChange: (v: number) => {
        this.spread = v;
        this.update();
        cb();
      },
    },
    blend: {
      value: 'multiply',
      options: {
        normal: 'normal',
        multiply: 'multiply',
        // screen: 'screen',
        overlay: 'overlay',
        darken: 'darken',
        lighten: 'lighten',
        // dodge: 'color-dodge',
        // burn: 'color-burn',
        difference: 'difference',
        exclusion: 'exclusion',
        hue: 'hue',
        saturation: 'saturation',
        color: 'color',
        // luminosity: 'luminosity',
      },
      onChange: (v: string) => {
        this.canvas.style.mixBlendMode = v;
        this.update();
        cb();
      },
    },
  });
}

export default CustomCanvasTexture;
