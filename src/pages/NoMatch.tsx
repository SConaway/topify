import { Divider, Link, Text } from '@geist-ui/core';

import Page from '~/components/Page';

function NoMatch() {
  return (
    <Page>
      <Text h1>Page not found</Text>

      <Text small>The page you are looking for does not exist.</Text>

      <Divider />

      <Text>
        Go back to the{' '}
        <Link href="/" color underline>
          home page
        </Link>
        .
      </Text>

      <Text>
        Or, if you've already signed in, head right to the app:{' '}
        <Link href="/top" color underline>
          Topify
        </Link>
        .
      </Text>
    </Page>
  );
}

export default NoMatch;
