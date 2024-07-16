const { navigator } = window;
const { userAgent } = navigator;

export const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
export const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
export const isIOSChrome = /CriOS/.test(userAgent);
export const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
export const isIOS = /iphone|ipad|ipod/.test(userAgent.toLowerCase());
export const isAndroid = /(android)/i.test(userAgent);
export const isIE = /MSIE|Trident/.test(userAgent);
export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const hasGeolocation = 'geolocation' in navigator;
export const isInStandalone = 'standalone' in navigator && navigator.standalone;
export const isInStandaloneMode = () => 'standalone' in navigator && navigator.standalone;

export const iosVersion =
  parseFloat(
    `${
      (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(userAgent) || [
        0,
        '',
      ])[1]
    }`
      .replace('undefined', '3_2')
      .replace(/_/g, '')
  ) || false;

// export const isCordova = () => !!(window.cordova);

// const isElectroninstance = () => {
//   // Renderer process
//   if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
//     return true;
//   }

//   // Main process
//   if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
//     return true;
//   }

//   // Detect the user agent when the `nodeIntegration` option is set to true
//   if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
//     return true;
//   }

//   return false;
// };

// export const isElectron = isElectroninstance();
