import fetch from 'cross-fetch';

export type MainCharacteristic = 'Acoustic' | 'Danceable' | 'Instrumental';

export type Mood = {
  danceability: number;
  energy: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  mainCharacteristic: MainCharacteristic | '';
};

export function getMainCharacteristic(mood: Mood): MainCharacteristic {
  const main = Object.entries(mood)
    .filter(
      ([k, v]: [string, any]) =>
        k === 'acousticness' || k === 'danceability' || k === 'instrumentalness',
    )
    .sort((x: any, y: any) => y[1] - x[1])[0][0];

  switch (main) {
    case 'acousticness':
      return 'Acoustic';
    case 'danceability':
      return 'Danceable';
    case 'instrumentalness':
      return 'Instrumental';
    default:
      return '';
  }

  // return (main.charAt(0).toUpperCase() + main.slice(1)) as MainCharacteristic;
}

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
    mainCharacteristic: getMainCharacteristic(item),
  })) as Mood[];
}

export default getMoods;
