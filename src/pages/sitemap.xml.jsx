import config from '../config';
import { toSlug } from '../utils/to-slug';

const Sitemap = () => {};

const createSitemap = (allContentUrls) => {
  const baseUrl = config.siteUrl;

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allContentUrls
          .map(
            (url) => `
                <url>
                    <loc>${`${baseUrl}${url}`}</loc>
                </url>
            `
          )
          .join('')}
    </urlset>
    `;
};

export const getServerSideProps = async ({ res }) => {
  const staticPageRoutes = ['/', '/blog', '/resources', '/snippets', '/notes'];

  const notionContentUrls = [
    { route: 'blog', notionID: process.env.NOTION_POSTS_ID },
    {
      route: 'notes',
      notionID: process.env.NOTION_NOTES_ID,
    },
    {
      route: 'resources',
      notionID: process.env.NOTION_RESOURCES_ID,
    },
  ];

  const allNotionUrls = await Promise.all(
    notionContentUrls.map(async ({ notionID, route }) => {
      const allPageMeta = await fetch(
        `https://notion-api.splitbee.io/v1/table/${notionID}`
      ).then((response) => response.json());

      return allPageMeta.flatMap((page) => {
        if (process.env.NODE_ENV === 'production' && !page.PublishedOn)
          return [];

        return `/${route}/${toSlug(page.Title)}`;
      });
    })
  );

  const allContentUrls = [...staticPageRoutes, ...allNotionUrls].flat();

  const siteMapContent = createSitemap(allContentUrls);

  // set cache to revalidate at most every 30 seconds
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.write(siteMapContent);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
