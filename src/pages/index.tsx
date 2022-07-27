import { Link, Page, Text } from '@geist-ui/core';

function App() {
  return (
    <Page dotBackdrop>
      <Text h2>Welcome to</Text>
      <Text h1>Topify</Text>
      {/* TODO: add description here */}
      <Text>To get started, head to the next page:</Text>
      <Link href="/api/spotifyLogin" icon color underline block>
        Sign In with Spotify
      </Link>
    </Page>
  );
}

export default App;
