import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import NoMatch from '~/pages/NoMatch';
import routes from '~react-pages';

function RouteWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes([
        ...routes,
        {
          path: '*',
          element: <NoMatch />,
        },
      ])}
    </Suspense>
  );
}

function App() {
  return (
    <GeistProvider>
      <CssBaseline />
      <BrowserRouter>
        <RouteWrapper />
      </BrowserRouter>
    </GeistProvider>
  );
}

export default App;
