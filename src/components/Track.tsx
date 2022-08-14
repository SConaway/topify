import { Card, Grid, Image, Progress, Text } from '@geist-ui/core';

interface MoodProps {
  label: string;
  value: number;
}

function Mood({ label, value }: MoodProps) {
  return (
    <div>
      <Text small>
        {label}{' '}
        <Text small span style={{ color: '#555' }}>
          — {Math.round(value * 1000) / 10}%
        </Text>
      </Text>
      <Progress value={value * 100} />
    </div>
  );
}

function Track({ track, index }: { track: any; index: number }) {
  return (
    <Grid xs={24} md={12} lg={8} xl={6} key={track.id}>
      <Card width="100%" hoverable>
        <Grid.Container gap={2} alignItems="center">
          <Grid xs={8}>
            <div>
              <style>
                {`
                  .image.track-image {
                    border-radius: 0;
                  }
                `}
              </style>
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                className="track-image"
                style={{
                  border: '1px solid #eee',
                }}
              />
            </div>
          </Grid>
          <Grid xs={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <Text h4 my={0} style={{ textTransform: 'capitalize' }}>
                {index + 1}. {track.name}
              </Text>
              <Text small>
                {track.artists.map((artist: any) => artist.name).join(', ')}
              </Text>
            </div>

            <hr style={{ width: '75%' }} />

            <Mood label="Valence" value={track.mood.valence} />
            <Mood label="Acousticness" value={track.mood.acousticness} />
            <Mood label="Danceability" value={track.mood.danceability} />
            <Mood label="Instrumentalness" value={track.mood.instrumentalness} />
          </Grid>
        </Grid.Container>
      </Card>
    </Grid>
  );
}

export default Track;
