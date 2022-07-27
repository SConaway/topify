import { Link, Page, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';

import genString from '~/util/genString';

function App() {
  const [randomString, setRandomString] = useState('');

  useEffect(() => {
    // if string was in local storage, use it; otherwise, make a new one and save it
    const storedString = localStorage.getItem('randomString');
    if (storedString) {
      setRandomString(storedString);
    } else {
      const newString = genString(16);
      localStorage.setItem('randomString', newString);
      setRandomString(newString);
    }
  }, []);

  return (
    <Page dotBackdrop>
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
