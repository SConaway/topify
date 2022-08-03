import getMoods from './getMoods';
import getTopTracks from './getTopTracks';

export type PeriodType = 'short_term' | 'medium_term' | 'long_term';

async function topTracksWithMood(accessToken: string, period: PeriodType) {
  let tracks = await getTopTracks(accessToken, period);

  const moods = await getMoods(
    accessToken,
    tracks.map((track) => track.id),
  );

  return tracks.map((track, index) => ({
    ...track,
    mood: moods[index],
  }));
}

export default topTracksWithMood;
