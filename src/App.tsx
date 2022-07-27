import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

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
      <Router>
        <RouteWrapper />
      </Router>
    </GeistProvider>
  );
}

export default App;
