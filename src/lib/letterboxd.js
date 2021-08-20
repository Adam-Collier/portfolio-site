import Parser from 'rss-parser';

export const getLatestFilms = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.LETTERBOXD_LATEST);
  const { items } = feed;
  // limit to what we need
  return items.slice(0, 5);
};
