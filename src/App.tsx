import '~/styles/App.css';

import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import routes from '~react-pages';

function RouteWrapper() {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
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
