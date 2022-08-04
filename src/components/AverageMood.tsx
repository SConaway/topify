import { Grid, Progress, Text } from '@geist-ui/core';

function Item({ label, value }: { label: string; value: number }) {
  return (
    <Grid xs={24} lg={7} alignItems="center" style={{ flexWrap: 'wrap' }}>
      <Text mr={1}>{label}</Text>

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
    <Grid.Container gap={8} justify="center">
      <Item label="Acousticness" value={averageMood.acousticness} />

      <Item label="Danceability" value={averageMood.danceability} />

      <Item label="Instrumentalness" value={averageMood.instrumentalness} />
    </Grid.Container>
  );
}

export default AverageMood;
