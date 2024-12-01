import { Card, Grid, Image, Link, Progress, Text } from '@geist-ui/core';

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
      <style>
        {`
          .image.track-image {
            border-radius: 0;
          }

          h4 > a.link > svg.icon {
            width: 0.5em;
          }
        `}
      </style>

      <Card width="100%" hoverable>
        <Grid.Container gap={2} alignItems="center">
          <Grid xs={8}>
            <div>
              <a href={track.external_urls.spotify}>
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="track-image"
                  style={{
                    border: '1px solid #eee',
                  }}
                />
              </a>

              <Text small>
                {/* @ts-expect-error complains about missing props */}
                <Link href={track.external_urls.spotify} icon color underline>
                  Open in Spotify
                </Link>
              </Text>
            </div>
          </Grid>
          <Grid xs={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <Text h4 my={0} style={{ textTransform: 'capitalize' }}>
                {index + 1}. {/* @ts-expect-error complains about missing props */}
                <Link icon href={track.external_urls.spotify}>
                  {track.name}
                </Link>
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
