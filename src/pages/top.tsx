import { Loading, Modal, Text, useModal } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Page from '~/components/page';

function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [fetchError, setFetchError] = useState('');

  const [accessToken, setAccessToken] = useState('');

  const [searchParams, _setSearchParams] = useSearchParams();
  // let [searchParams, setSearchParams] = useSearchParams();

  const handleAuth = () => {
    const successFromParams = searchParams.get('success');
    const stateFromParams = searchParams.get('state');
    const accessTokenFromParams = searchParams.get('access_token');
    // const tokenType = searchParams.get('token_type');
    // const expiresIn = searchParams.get('expires_in');
    // const scope = searchParams.get('scope');
    // const refreshToken = searchParams.get('refresh_token');

    console.log(localStorage.getItem('randomString'));

    if (!localStorage.getItem('randomString')) {
      console.warn('No random string found in localStorage, heading back to main page');
      navigate('/');
      return;
    }

    if (
      !successFromParams ||
      !stateFromParams ||
      !accessTokenFromParams
      // || !scope
      // || !refreshToken
    ) {
      const error = 'missing part of authentication';
      console.warn(error);
      setAuthError(error);
      return;
    }

    if (stateFromParams !== localStorage.getItem('randomString')) {
      const error = 'state does not match random string';
      console.warn(error);
      setAuthError(error);
      return;
    }

    // hide params
    // setSearchParams('');

    setAccessToken(accessTokenFromParams);
  };

  const getData = async () => {
    if (!accessToken) {
      const error = 'no access token found';
      console.warn(error);
      setFetchError(error);
      return;
    }

    const response = await fetch(`/api/top?accessToken=${accessToken}`);

    if (!response.ok) {
      const error = await response.text();
      console.warn(error);
      setFetchError(error);
      return;
    }

    const data = await response.json();
    console.log(data);

    setLoading(false);
  };

  useEffect(() => {
    const doThings = async () => {
      handleAuth();
      await getData();
    };

    doThings().catch(console.error);
  }, []);

  return (
    <Page>
      {authError ? (
        <>
          <Error
            error={authError}
            title="Authentication Error"
            retryAction={() => navigate('/')}
          />
        </>
      ) : fetchError ? (
        <>
          <Error error={fetchError} title="Fetch Error" retryAction={getData} />
        </>
      ) : loading ? (
        <>
          <Loading>Loading</Loading>
        </>
      ) : (
        <p>hi</p>
      )}
    </Page>
  );
}

function Error({
  error,
  title,
  retryAction,
}: {
  error: string;
  title: string;
  retryAction: () => void;
}) {
  const { bindings } = useModal(true);

  return (
    <Modal {...bindings} disableBackdropClick keyboard={false}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Subtitle>Something went wrong.</Modal.Subtitle>
      <Modal.Content>
        <Text>Please try again.</Text>
        <Text small>{error}</Text>
      </Modal.Content>
      <Modal.Action onClick={retryAction}>Try Again</Modal.Action>
    </Modal>
  );
}

export default App;
