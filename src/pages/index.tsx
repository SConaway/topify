import { Link, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';

import Page from '~/components/page';
import genString from '~/util/genString';

function App() {
  const [randomString, setRandomString] = useState('');

  useEffect(() => {
    if (!randomString) {
      const newString = genString(16);
      setRandomString(newString);
      localStorage.setItem('randomString', newString);
    }
  }, []);

  return (
    <Page>
      <Text h2>Welcome to</Text>
      <Text h1>Topify</Text>
      {/* TODO: add description here */}
      <Text>To get started, head to the next page:</Text>
      <Link href={`/api/spotifyLogin?id=${randomString}`} icon color underline block>
        Sign In with Spotify
      </Link>
    </Page>
  );
}

export default App;
