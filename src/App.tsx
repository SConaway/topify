import { CssBaseline, GeistProvider } from '@geist-ui/core';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Index from '~/pages/index';
// import NoMatch from '~/pages/NoMatch';
// import Top from '~/pages/top';

const Index = React.lazy(() => import('~/pages/index'));
const NoMatch = React.lazy(() => import('~/pages/NoMatch'));
const Top = React.lazy(() => import('~/pages/top'));

function App() {
  return (
    <GeistProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div></div>}>
                <Index />
              </Suspense>
            }
          />
          <Route
            path="/top"
            element={
              <Suspense fallback={<div></div>}>
                <Top />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div></div>}>
                <NoMatch />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </GeistProvider>
  );
}

export default App;
