import { Card, Grid, Loading, Select, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import AverageMood from '~/components/AverageMood';
import Error from '~/components/Error';
import Page from '~/components/Page';
import Track from '~/components/Track';

function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [fetchError, setFetchError] = useState('');

  const [accessToken, setAccessToken] = useState('');

  const [period, setPeriod] = useState('medium_term');

  const [data, setData] = useState<any>(null);

  console.log(data);

  const [searchParams, _setSearchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();

  const handleAuth = () => {
    const successFromParams = searchParams.get('success');
    const stateFromParams = searchParams.get('state');
    const accessTokenFromParams = searchParams.get('access_token');

    if (!localStorage.getItem('randomString')) {
      console.warn('No random string found in localStorage, heading back to main page');
      navigate('/');
      return;
    }

    if (!successFromParams || !stateFromParams || !accessTokenFromParams) {
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

    setData(data);

    setLoading(false);
  };

  useEffect(() => {
    handleAuth();
  }, []);

  useEffect(() => {
    setLoading(true);

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
      <Text h1>Topify</Text>

      <div>
        <Text mr={1} span>
          Select a period:
        </Text>

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
          <Error
            error={fetchError}
            title="Fetch Error"
            retryAction={() => navigate('/')}
          />
        </>
      ) : loading ? (
        <>
          <Loading>Loading</Loading>
        </>
      ) : (
        <>
          <Card hoverable my={1} pb={1}>
            <Text h2 style={{ textAlign: 'center' }}>
              {`${
                data.averageMood.mainCharacteristic === 'Acousticness'
                  ? '🎸'
                  : data.averageMood.mainCharacteristic === 'Danceability'
                  ? '🪩'
                  : '🎻'
              } ${data.averageMood.mainCharacteristic}`}
            </Text>

            <Text h4>Average Stats</Text>

            <AverageMood averageMood={data.averageMood} />
          </Card>

          <Grid.Container gap={2}>
            {data?.tracks?.map((track: any) => (
              <Track track={track} key={track.id} />
            ))}
          </Grid.Container>
        </>
      )}
    </Page>
  );
}

export default App;
