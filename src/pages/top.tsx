import { Loading, Select, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Error from '~/components/error';
import Page from '~/components/page';

function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [fetchError, setFetchError] = useState('');

  const [accessToken, setAccessToken] = useState('');

  const [period, setPeriod] = useState('medium_term');

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

    // console.log(localStorage.getItem('randomString'));

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

    const url = `/api/top?accessToken=${accessToken}&period=${period}`;

    console.log(url);

    const response = await fetch(url);

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
    handleAuth();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      console.log('no access token found, probably will rerun soon');
      return;
    }

    const doThings = async () => {
      await getData();
    };

    doThings().catch(console.error);
  }, [period, accessToken]);

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
        <>
          <Text h1>Topify</Text>
          <div>
            <label style={{ marginRight: 10 }} htmlFor="period">
              Select a period:
            </label>
            <Select
              id="period"
              placeholder="Choose one"
              value={period}
              onChange={(newValue) => setPeriod(newValue as string)} // only one because no `multiple` prop
            >
              <Select.Option value="short_term">Short Term (last 4 weeks)</Select.Option>
              <Select.Option value="medium_term">
                Medium Term (last 6 months, default)
              </Select.Option>
              <Select.Option value="long_term">Long Term (all history)</Select.Option>
            </Select>
          </div>
        </>
      )}
    </Page>
  );
}

export default App;
