import getMoods, { getMainCharacteristic, Mood } from './getMoods';
import getTopTracks, { Track } from './getTopTracks';

export type PeriodType = 'short_term' | 'medium_term' | 'long_term';

export type TrackWithMood = Track & { mood: Mood };

async function topTracksWithMood(accessToken: string, period: PeriodType) {
  const tracks = await getTopTracks(accessToken, period);

  const moods = await getMoods(
    accessToken,
    tracks.map((track) => track.id),
  );

  return tracks.map((track, index) => ({
    ...track,
    mood: moods[index],
  })) as TrackWithMood[];
}

function getAverageMood(tracks: TrackWithMood[]): Mood {
  // add stats
  let averageMood: Mood = tracks.reduce(
    (acc, track) => {
      return {
        acousticness: acc.acousticness + track.mood.acousticness,
        danceability: acc.danceability + track.mood.danceability,
        energy: acc.energy + track.mood.energy,
        instrumentalness: acc.instrumentalness + track.mood.instrumentalness,
        liveness: acc.liveness + track.mood.liveness,
        valence: acc.valence + track.mood.valence,
        mainCharacteristic: '',
      };
    },
    {
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      valence: 0,
      mainCharacteristic: '',
    },
  );

  // divide by number of tracks
  averageMood = {
    acousticness: averageMood.acousticness / tracks.length,
    danceability: averageMood.danceability / tracks.length,
    energy: averageMood.energy / tracks.length,
    instrumentalness: averageMood.instrumentalness / tracks.length,
    liveness: averageMood.liveness / tracks.length,
    valence: averageMood.valence / tracks.length,
    mainCharacteristic: '',
  };

  // get main characteristic
  averageMood.mainCharacteristic = getMainCharacteristic(averageMood);

  return averageMood;
}

export default async (accessToken: string, period: PeriodType) => {
  const tracks = await topTracksWithMood(accessToken, period);

  const averageMood = getAverageMood(tracks);

  return {
    tracks,
    averageMood,
  };
};
