import fetch from 'cross-fetch';

export type Track = {
  id: string;
  name: string;
  artists: {
    name: string;
    id: string;
  }[];
  album: {
    name: string;
    id: string;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  };
};

async function getTopTracks(
  accessToken: string,
  period: 'short_term' | 'medium_term' | 'long_term',
) {
  const url = `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${period}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { headers });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  return json.items
    .filter((item: any) => !item.is_local)
    .map((item: any) => ({
      // remove many fields from the response
      id: item.id,
      name: item.name,
      artists: item.artists.map((artist: any) => ({
        name: artist.name,
        id: artist.id,
      })),
      album: {
        name: item.album.name,
        id: item.album.id,
        images: item.album.images.map((image: any) => ({
          url: image.url,
          width: image.width,
          height: image.height,
        })),
      },
    })) as Track[];
}

export default getTopTracks;
