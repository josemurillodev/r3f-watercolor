import { button, folder, useControls } from 'leva';
import { StoreType } from 'leva/dist/declarations/src/types';
import { useEffect, useRef } from 'react';
import { Camera, Scene, WebGLRenderer } from 'three';
import { downloadFromURL } from '../helpers/helper-download';
import { noop, throttle } from '../helpers/helper-util';

const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

export default function useDownloadLeva({
  gl,
  scene,
  camera,
  postActive,
  postRef,
  store,
  cb = noop,
}: {
  gl: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  postActive: boolean;
  postRef: any;
  store: StoreType;
  cb?: () => void;
}) {
  const postActiveRef = useRef(postActive);
  const onDPRChange = (v: number) => {
    gl.setPixelRatio(v);
    cb();
  };
  const onDelayedChange = throttle(onDPRChange, 200);
  useControls(
    {
      DOWNLOAD: folder(
        {
          dpr: {
            value: devicePixelRatio,
            min: 0.5,
            max: 2.0,
            step: 0.1,
            onChange: onDelayedChange,
          },
          download: button((get) => {
            gl.render(scene, camera);
            if (postActiveRef?.current) {
              postRef.current?.setSize(
                window.innerWidth * get('DOWNLOAD.dpr'),
                window.innerHeight * get('DOWNLOAD.dpr')
              );
              postRef.current?.render();
              const screenshot =
                postRef.current?.renderer.domElement.toDataURL('image/png');
              postRef.current?.setSize(window.innerWidth, window.innerHeight);
              downloadFromURL(screenshot);
            } else {
              const screenshot = gl.domElement.toDataURL('image/png');
              downloadFromURL(screenshot);
            }
            cb();
          }),
        },
        { collapsed: true }
      ),
    },
    { store }
  );

  useEffect(() => {
    postActiveRef.current = postActive;
  }, [postActive]);
}
