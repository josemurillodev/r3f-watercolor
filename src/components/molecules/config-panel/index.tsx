import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

import './style.scss';

import Scroller from '@/components/atoms/scroller';
import { isDev } from '@/helpers/helper-util';

type ConfigPanelProps = {
  children?: ReactNode;
};

function ConfigPanel({ children }: ConfigPanelProps) {
  const [reversed, setReversed] = useState(isDev);
  const el = useRef<HTMLDivElement>(null);
  const q = useMemo(() => gsap.utils.selector(el), [el]);

  // store the timeline in a ref.
  const tl = useRef<ReturnType<typeof gsap.timeline> | null>();

  useEffect(() => {
    if (tl.current) {
      tl.current.progress(0).kill();
    }
    tl.current = gsap.timeline().to(q('.app__configs--leva-scroll'), {
      x: -280,
      opacity: 0,
    });
  }, [q]);

  useEffect(() => {
    // toggle the direction of our timeline
    tl.current?.reversed(reversed);
  }, [reversed]);

  return (
    <div className="app__configs">
      <div className="app__configs--menu">
        <button
          type="button"
          className="app__configs--menu-btn"
          onClick={() => setReversed(!reversed)}
        >
          <svg className="app__configs--svg" viewBox="0 0 100 100">
            <path className="line line2" d="M 20,50 H 80" />
          </svg>
        </button>
      </div>
      <div className="app__configs--leva">
        <div ref={el} className="app__configs--leva-inner">
          <Scroller className="app__configs--leva-scroll">{children}</Scroller>
        </div>
      </div>
    </div>
  );
}

export default ConfigPanel;
