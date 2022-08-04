import { Card, Grid, Loading, Progress, Select, Text } from '@geist-ui/core';
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

            <Grid.Container gap={8} justify="center">
              <Grid xs={24} lg={7} alignItems="center" style={{ flexWrap: 'wrap' }}>
                <Text mr={1}>Acousticness</Text>

                <div
                  style={{
                    width: '100%',
                    minWidth: 200,
                    maxWidth: 600,
                    marginLeft: 'auto',
                  }}
                >
                  <Progress value={data.averageMood.acousticness * 100} />

                  <Text small span style={{ color: '#555' }}>
                    {Math.round(data.averageMood.acousticness * 1000) / 10} %
                  </Text>
                </div>
              </Grid>

              <Grid xs={24} lg={7} alignItems="center" style={{ flexWrap: 'wrap' }}>
                <Text mr={1}>Danceability</Text>

                <div
                  style={{
                    width: '100%',
                    minWidth: 200,
                    maxWidth: 600,
                    marginLeft: 'auto',
                  }}
                >
                  <Progress value={data.averageMood.danceability * 100} />

                  <Text small span style={{ color: '#555' }}>
                    {Math.round(data.averageMood.danceability * 1000) / 10} %
                  </Text>
                </div>
              </Grid>

              <Grid xs={24} lg={7} alignItems="center" style={{ flexWrap: 'wrap' }}>
                <Text mr={1}>Instrumentalness</Text>

                <div
                  style={{
                    width: '100%',
                    minWidth: 200,
                    maxWidth: 600,
                    marginLeft: 'auto',
                  }}
                >
                  <Progress value={data.averageMood.instrumentalness * 100} />

                  <Text small span style={{ color: '#555' }}>
                    {Math.round(data.averageMood.instrumentalness * 1000) / 10} %
                  </Text>
                </div>
              </Grid>
            </Grid.Container>
          </Card>
        </>
      )}
    </Page>
  );
}

export default App;
