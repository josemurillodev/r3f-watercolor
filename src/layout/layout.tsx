import { ReactNode, useEffect, useRef } from 'react';

interface LayoutProps {
  children: ReactNode;
  theme?: string;
}

function Layout({ children, theme = '' }: LayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.getElementsByTagName('html')[0];
    const curTheme = root.getAttribute('color-scheme') || '';
    if (theme !== curTheme) {
      root.setAttribute('color-scheme', curTheme);
      document.body.classList.remove(`color-scheme-${curTheme}`);
      root.setAttribute('color-scheme', theme);
      document.body.classList.add(`color-scheme-${theme}`);
    }
  }, [theme]);

  return (
    <div className="app__layout" ref={containerRef}>
      {children}
    </div>
  );
}

export default Layout;
