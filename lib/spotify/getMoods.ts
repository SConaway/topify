import fetch from 'cross-fetch';

export type Mood = {
  danceability: number;
  energy: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
};

async function getMoods(accessToken: string, ids: string[]) {
  const url = `https://api.spotify.com/v1/audio-features?ids=${ids.join(',')}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { headers });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  return json.audio_features.map((item: any) => ({
    danceability: item.danceability,
    energy: item.energy,
    acousticness: item.acousticness,
    instrumentalness: item.instrumentalness,
    liveness: item.liveness,
    valence: item.valence,
  })) as Mood[];
}

export default getMoods;
