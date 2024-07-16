import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@/templates/home';
import NotFound from '@/templates/notfound';
import PageLoader from '@/components/atoms/loader';

import { routes } from '@/templates';

function RouterWeb() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {routes.map((obj) => (
          <Route key={obj.url} path={obj.path} element={<obj.component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default RouterWeb;
