import type { VercelRequest, VercelResponse } from '@vercel/node';

import topTracksWithMood, { PeriodType } from '../lib/spotify';

export default async (request: VercelRequest, response: VercelResponse) => {
  if (
    request.query.period !== 'short_term' &&
    request.query.period !== 'medium_term' &&
    request.query.period !== 'long_term'
  ) {
    response.status(400).json({ error: 'Invalid period' });
    return;
  }
  if (!request.query.accessToken || typeof request.query.accessToken !== 'string') {
    response.status(400).json({ error: 'Missing access_token' });
    return;
  }

  const period = request.query.period as PeriodType;
  const accessToken = request.query.accessToken;

  try {
    const data = await topTracksWithMood(accessToken, period);

    // console.log(data);

    response.status(200).json(data);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};
