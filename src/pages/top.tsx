import { Loading, Modal, Text, useModal } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Page from '~/components/page';

function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const success = searchParams.get('success');
    const state = searchParams.get('state');
    const accessToken = searchParams.get('access_token');
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
      !success ||
      !state ||
      !accessToken
      // || !scope
      // || !refreshToken
    ) {
      console.warn('missing part of authentication, error time');
      setAuthError(true);
      return;
    }

    if (state !== localStorage.getItem('randomString')) {
      console.warn('state does not match random string, error time');
      setAuthError(true);
      return;
    }

    // hide params
    setSearchParams('');

    // TODO: actual things here

    setLoading(false);
  }, []);

  return (
    <Page>
      {loading ? (
        <>
          <Loading>Loading</Loading>
        </>
      ) : authError ? (
        <>
          <AuthError />
        </>
      ) : (
        <p>hi</p>
      )}
    </Page>
  );
}

function AuthError() {
  const { bindings } = useModal(true);
  const navigate = useNavigate();

  return (
    <Modal {...bindings} disableBackdropClick keyboard={false}>
      <Modal.Title>Authentication Error</Modal.Title>
      <Modal.Subtitle>Something went wrong.</Modal.Subtitle>
      <Modal.Content>
        <Text small>Please try again.</Text>
      </Modal.Content>
      {/* <Modal.Action passive onClick={() => setVisible(false)}>
        Cancel
      </Modal.Action> */}
      <Modal.Action onClick={() => navigate('/')}>Try Again</Modal.Action>
    </Modal>
  );
}

export default App;
