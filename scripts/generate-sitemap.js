/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const pages = await globby([
    'src/pages/*.jsx',
    '{_posts,_resources}/**/*.mdx',
    '!src/pages/_*.jsx',
    '!src/pages/{api,404.js}',
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('src/pages', '')
                  .replace('.jsx', '')
                  .replace('/index.mdx', '')
                  .replace('_resources', '/resources')
                  .replace('_posts', '/blog');

                const route = path === '/index' ? '' : path;

                return `
                        <url>
                            <loc>${`https://adamcollier.co.uk${route}`}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
