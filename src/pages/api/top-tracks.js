import { getTopTracks } from '../../lib/spotify';

export default async (_, res) => {
  const response = await getTopTracks();
  console.log(response);
  const { items: toptracks } = await response.json();

  const tracks = toptracks.slice(0, 5).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    url: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  return res.status(200).json({ tracks });
};
