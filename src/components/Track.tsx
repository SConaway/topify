import { Card, Grid, Image, Progress, Text } from '@geist-ui/core';

function Track({ track }: { track: any }) {
  return (
    <Grid xs={24} sm={12} lg={8} xl={6} key={track.id}>
      <Card width="100%" hoverable>
        <Grid.Container gap={2} alignItems="center">
          <Grid xs={8}>
            <div>
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                }}
              />
              {/* <img
                src={track.album.images[0].url}
                alt={track.name}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                }}
              /> */}
            </div>
          </Grid>
          <Grid xs={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <Text h4 my={0} style={{ textTransform: 'capitalize' }}>
                {track.name}
              </Text>
              <Text small>
                {track.artists.map((artist: any) => artist.name).join(', ')}
              </Text>
            </div>

            <hr style={{ width: '75%' }} />

            <div>
              <Text small>Acousticness</Text>
              <Progress value={track.mood.acousticness * 100} />
            </div>
            <div>
              <Text small>Danceability</Text>
              <Progress value={track.mood.danceability * 100} />
            </div>
            <div>
              <Text small>Instrumentalness</Text>
              <Progress value={track.mood.instrumentalness * 100} />
            </div>
          </Grid>
        </Grid.Container>
      </Card>
    </Grid>
  );
}

export default Track;
