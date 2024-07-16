import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { isInStandaloneMode } from '../../../helpers/helper-useragent';

import './style.scss';

interface ScrollerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Scroller({ children, className, style }: ScrollerProps) {
  const scrollerRef = useRef(null);
  useEffect(() => {
    const curRef = scrollerRef.current;
    if (isInStandaloneMode() && curRef) {
      disableBodyScroll(curRef);
    }
    return () => {
      if (isInStandaloneMode() && curRef) {
        enableBodyScroll(curRef);
      }
    };
  }, []);
  return (
    <div ref={scrollerRef} className={`app__scroller ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Scroller;
