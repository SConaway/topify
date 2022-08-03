import topTracksWithMood from '.';

const run = async () => {
  const accessToken =
    'BQDwPm3339wGMkX4vc25_D9W-J8VzyBsJEZd6HRo9NbOmgb2hgn_UPONXzdri8H3nt2NqqhRxDMGPBQbPuWjCE_JFJbQe76wk4J4AjqfahaZjN88cV6FHNj3xQKuhp_LDQPkIXt47pAOEZh3tz-qgM_afdOdMtHId7nqoXNQlnSfWW0j7ztDstFj';
  const period = 'short_term';

  const result = await topTracksWithMood(accessToken, period);
  console.log(result);
};

run().catch(console.error);
