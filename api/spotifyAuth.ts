import type { VercelRequest, VercelResponse } from '@vercel/node';

import fetch from 'cross-fetch';

interface SpotifyAuthResponseFailure {
  error: string;
  error_description: string;
}
interface SpotifyAuthResponseSuccess {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}
type SpotifyAuthResponse = SpotifyAuthResponseFailure | SpotifyAuthResponseSuccess;

export default async (request: VercelRequest, response: VercelResponse) => {
  const { state, code } = request.query;

  if (!code || typeof code !== 'string') {
    response.send(`Error: something went wrong. Please try again.`);
    return;
  }

  const params = new URLSearchParams({
    code: code,
    grant_type: 'authorization_code',
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    scope: process.env.SPOTIFY_SCOPE!,
    redirect_uri: `${process.env.PUBLIC_HOST!}/api/spotifyAuth`,
  });

  const f = await fetch(`https://accounts.spotify.com/api/token?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  const json = (await f.json()) as SpotifyAuthResponse;

  if ('error' in json) {
    response.send(`Error: ${json.error} description=${json.error_description}`);
    return;
  }

  let resParams = new URLSearchParams({
    success: 'true',
  });

  if (state && typeof state === 'string') {
    resParams.append('state', state);
  }

  // add each key in json to resParams
  for (const key in json) {
    resParams.append(key, json[key as keyof SpotifyAuthResponse]);
  }

  response.redirect('/top?' + resParams.toString());
};
