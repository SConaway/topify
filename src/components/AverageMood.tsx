import { Grid, Progress, Text, Tooltip } from '@geist-ui/core';
import Info from '@geist-ui/icons/info';

function Item({
  label,
  description,
  value,
}: {
  label: string;
  description?: string;
  value: number;
}) {
  return (
    <Grid xs={24} lg={6} alignItems="center" style={{ flexWrap: 'wrap' }}>
      {/* <Text mr={1}>{label}</Text> */}

      <Text small>
        {label}{' '}
        {description && (
          <Tooltip text={description} placement="right">
            <Info
              // style={{ marginLeft: '0.5rem' }}
              size="1em"
            />
          </Tooltip>
        )}
      </Text>

      <div
        style={{
          width: '100%',
        }}
      >
        <Progress value={value * 100} />

        <Text small span style={{ color: '#555' }}>
          {Math.round(value * 1000) / 10} %
        </Text>
      </div>
    </Grid>
  );
}

function AverageMood({ averageMood }: { averageMood: any }) {
  return (
    <Grid.Container gap={3} justify="center">
      <Item
        label="Valence"
        value={averageMood.valence}
        description="Spotify's metric of a song's happiness."
      />

      <Item label="Acousticness" value={averageMood.acousticness} />

      <Item label="Danceability" value={averageMood.danceability} />

      <Item label="Instrumentalness" value={averageMood.instrumentalness} />
    </Grid.Container>
  );
}

export default AverageMood;
