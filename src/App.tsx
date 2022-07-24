import './App.css';

import { useState } from 'react';

import { GeistProvider, CssBaseline, Page, Text, Button } from '@geist-ui/core';

import logo from './logo.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <GeistProvider>
      <CssBaseline />
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="header">
            🚀 Vite + React + Typescript 🤘 & <br />
            Eslint 🔥+ Prettier
          </p>

          <div className="body">
            <button onClick={() => setCount((count) => count + 1)}>
              🪂 Click me : {count}
            </button>

            <p> Don&apos;t forgot to install Eslint and Prettier in Your Vscode.</p>

            <p>
              Mess up the code in <code>App.tsx </code> and save the file.
            </p>
            <p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
              {' | '}
              <a
                className="App-link"
                href="https://vitejs.dev/guide/features.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vite Docs
              </a>
            </p>
          </div>
        </header>
      </div> */}

      <Page>
        <Text h1>Home Page</Text>
        <Button>Submit</Button>
      </Page>
    </GeistProvider>
  );
}

export default App;
