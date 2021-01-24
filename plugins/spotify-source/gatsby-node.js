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

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  pluginOptions
) => {
  const { clientId, clientSecret, refreshToken } = pluginOptions;
  const { createNode } = actions;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`;
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type TopTracks implements Node {
      id: ID!
      # create a relationship between YourSourceType and the File nodes for optimized images
      remoteImage: File @link
    }`);
};

// taken from https://www.gatsbyjs.com/docs/creating-a-source-plugin/#sourcing-and-optimizing-images-from-remote-locations
exports.onCreateNode = async ({
  actions: { createNode },
  getCache,
  createNodeId,
  node,
}) => {
  // because onCreateNode is called for all nodes, verify that you are only running this code on nodes created by your plugin
  if (node.internal.type === `TopTracks`) {
    // create a FileNode in Gatsby that gatsby-transformer-sharp will create optimized images for
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.album.images[0].url,
      getCache,
      createNode,
      createNodeId,
      parentNodeId: node.id,
    });

    if (fileNode) {
      // with schemaCustomization: add a field `remoteImage` to your source plugin's node from the File node
      node.remoteImage = fileNode.id;
    }
  }
};
