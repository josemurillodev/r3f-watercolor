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

  visible = false;

  radius = 80;

  hue = 0;

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
    this.canvas.style.zIndex = '1';
    this.canvas.style.mixBlendMode = 'multiply';
    // this.canvas.style.opacity = '0.5';
    // this.canvas.style.opacity = '0.00001';
    this.canvas.style.backgroundColor = 'rgba(255,255,255,1)';
    this.context = this.canvas.getContext('2d')!;
    document.body.append(this.canvas);

    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.instance = new CanvasTexture(this.canvas);
    this.instance.magFilter = NearestFilter;
    this.context.globalAlpha = 1;
    this.context.fillStyle = 'rgba(255,255,255,1)';
    this.context.fillRect(0, 0, this.width, this.height);

    document.addEventListener('pointermove', this.pointerMove);
  }

  pointerMove = (e: PointerEvent) => {
    this.mouse = {
      x: e.x,
      y: e.y,
    };
    this.points.push(new Particles(this.context, this.mouse, this.hue));
    this.hue += 0.1;
    // for (let i = 0; i < 5; i++) {
    //   this.points.push(new Particles(this.context, this.mouse));
    // }
  };

  update = () => {
    this.context.fillStyle = 'rgba(255,255,255,1)';
    this.context.fillRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.points.length; i += 1) {
      this.points[i].update();
      this.points[i].draw();
      if (this.points[i].size <= 0.1) {
        this.points.splice(i, 1);
        --i;
      }
    }

    // Update texture instance
    this.instance.needsUpdate = true;
  };

  dispose = () => {
    document.body.removeChild(this.canvas);
    // TODO

    document.removeEventListener('pointermove', this.pointerMove);
    // console.log('dispose', this.visible);
  };

  getLevaConfig = (cb = noop) => ({
    visible: {
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
    radius: {
      value: 20,
      min: 1,
      max: 100,
      step: 0.0001,
      onChange: (v: number) => {
        this.radius = v;
        this.update();
        cb();
      },
    },
  });
}

export default CustomCanvasTexture;
