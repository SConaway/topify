import fetch from 'cross-fetch';

export type MainCharacteristic = 'Acoustic' | 'Danceable' | 'Instrumental' | '';

export type Mood = {
  danceability: number;
  energy: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  mainCharacteristic: MainCharacteristic;
};
export function getMainCharacteristic(mood: Mood): MainCharacteristic {
  const relevantKeys: Array<keyof Mood> = [
    'acousticness',
    'danceability',
    'instrumentalness',
  ];

  const main = (
    relevantKeys.map((key) => [key, mood[key]] as const) as Array<[keyof Mood, number]>
  ).sort(([, valueA], [, valueB]) => valueB - valueA)[0][0];

  return (
    {
      acousticness: 'Acoustic',
      danceability: 'Danceable',
      instrumentalness: 'Instrumental',
    }[main] || ''
  );
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
