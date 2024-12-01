import topTracksWithMood from './index.js';

const run = async () => {
  const accessToken =
    'BQAb_iCJskQBAl33VaLcFjQXWdbuA8xErY0urCbAliS0BG_1JGMqRnK5KkGxjEL9nq10gI6YIAIh7dqn__AjsKr4xxbOqceZxhPtvplJZeYwkS0yqAO9AcXRlfBGwsEjZ2P91A3y2aA3dNqvKdI528eo_bUeQjB-pLfeO96WSoJphUxcAPXvEPqRUTrVaxR1';
  const period = 'short_term';

  const result = await topTracksWithMood(accessToken, period);
  console.log(result);
};

run().catch(console.error);
