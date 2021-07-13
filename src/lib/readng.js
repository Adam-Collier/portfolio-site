import Parser from 'rss-parser';

export const getReadngContent = async () => {
  const urls = [
    process.env.READNG_READ,
    process.env.READNG_WANT_TO_READ,
    process.env.READNG_CURRENTLY_READING,
  ];

  const parser = new Parser();

  const [read, toRead, reading] = await Promise.all(
    urls.map(async (url) => {
      const feed = await parser.parseURL(url);
      const { items } = feed;
      // limit to what we need
      return items.slice(0, 3);
    })
  );

  return { read, toRead, reading: reading[0] };
};
