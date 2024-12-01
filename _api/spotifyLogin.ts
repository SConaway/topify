import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (request: VercelRequest, response: VercelResponse) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: process.env.SPOTIFY_SCOPE!,
    redirect_uri: `${process.env.PUBLIC_HOST!}/api/spotifyAuth`,
    state: (request.query.id as string) ?? '',
  });

  response.redirect('https://accounts.spotify.com/authorize?' + params.toString());
};
