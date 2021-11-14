import { getTopTracks } from '../../lib/spotify';

const topTracksAPI = () => async (_, res) => {
  const response = await getTopTracks();
  const { items: toptracks } = await response.json();

  const tracks = toptracks.map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    url: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ tracks });
};

export default topTracksAPI;
