/* eslint-disable @typescript-eslint/no-this-alias */
export const noop = () => {};

export const isDev = import.meta.env.MODE === 'development';

export const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 4);

export const isMusic = (filename: string) =>
  /([a-zA-Z0-9\s_\\.\-():])+(.mp3|.wav|.flac|.aac|.m4a|.aiff|.mp4)$/i.test(filename);

export const debounce = (func: (...e: any) => any, wait: number, immediate?: boolean) => {
  let timeout: NodeJS.Timeout | number | undefined;
  return function wrapper(this: void, ...args: any) {
    const context = this;
    const later = () => {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const throttle = (callback: (...e: any) => any, del: number) => {
  let isThrottled = false;
  let arg: any;
  let context: any;

  function wrapper(this: void, ...args: any) {
    if (isThrottled) {
      arg = args;
      context = this;
      return;
    }

    isThrottled = true;
    callback.apply(this, args);

    setTimeout(() => {
      isThrottled = false;
      if (arg) {
        wrapper.apply(context, arg);
        arg = null;
        context = null;
      }
    }, del);
  }

  return wrapper as typeof callback;
};

export const reverseNumber = (val: number, min: number, max: number) => min + max - val;

export const normalize = (val: number, max = 255, min = 0) => (val - min) / (max - min);

export const normalizeValue = (
  val: number,
  min: number,
  max: number,
  reverse = false
) => {
  const reversed = reverse ? reverseNumber(val, min, max) : val;
  return (reversed - min) / (max - min);
};

export const normalizeRange = (
  val: number,
  OldMax = 255,
  OldMin = 0,
  NewMax = -1,
  NewMin = 1
) => ((val - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin) + NewMin;

export const clampValue = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

export const getSupportedPropertyName = (properties: any) => {
  for (let i = 0; i < properties.length; i += 1) {
    if (typeof document.body.style[properties[i]] !== 'undefined') {
      return properties[i];
    }
  }
  return null;
};

export const getTransformProperty = () =>
  getSupportedPropertyName([
    'transform',
    'msTransform',
    'webkitTransform',
    'mozTransform',
    'oTransform',
  ]);

export const isWebGLSupported = () => {
  // Create canvas element. The canvas is not added to the
  // document itself, so it is never displayed in the
  // browser window.
  const canvas = window.document.createElement('canvas');
  // Get WebGLRenderingContext from canvas element.
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  // Report the result.
  return !!(gl && gl instanceof WebGLRenderingContext);
};

// export const webGLSupported = isWebGLSupported();

export const parseQuery = (queryString: string) => {
  const query: { [e: string]: any } = {};
  const pairs = (queryString[0] === '?' ? queryString.substring(1) : queryString).split(
    '&'
  );
  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

export const getElemSize = (el?: HTMLElement) => {
  if (el) {
    const box = el.getBoundingClientRect();
    return {
      width: box.width,
      height: box.height,
    };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};
