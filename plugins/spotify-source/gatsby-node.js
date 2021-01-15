/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
const fetch = require(`node-fetch`);
const querystring = require('querystring');

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  pluginOptions
) => {
  const { clientId, clientSecret, refreshToken } = pluginOptions;
  const { createNode } = actions;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

  const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    return response.json();
  };

  const getTopTracks = async () => {
    const { access_token: accessToken } = await getAccessToken();

    return fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const topTracksResponse = await getTopTracks();
  const { items: topTracksData } = await topTracksResponse.json();

  topTracksData.forEach((track) => {
    createNode({
      ...track,
      id: createNodeId(`Track-${track.id}`),
      parent: null,
      children: [],
      internal: {
        type: `TopTracks`,
        contentDigest: createContentDigest(track),
      },
    });
  });
};
