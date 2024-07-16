import { CSSProperties, FC } from 'react';

import './style.scss';

interface PageLoaderProps {
  className?: string,
  style?: CSSProperties,
}

const PageLoader: FC<PageLoaderProps> = ({ className = '', style }) => (
  <div className={`app__loader dark-bg2 ${className}`} style={style}>
    <div className="app__loader--halo" />
  </div>
);

export default PageLoader;
