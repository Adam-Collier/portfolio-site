export const getHeadings = (source) => {
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source
    .split('\n')
    .filter((line) => line.match(/^###*\s/));

  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  return headingLines.map((raw) => {
    const title = raw.replace(/^###*\s/, '');
    const id = title.toLowerCase().replace(/ /g, '-');
    // I only care about h2 and h3.
    // If I wanted more levels, I'd need to count the
    // number of #s.
    const level = raw.slice(0, 3) === '###' ? 3 : 2;

    return { id, title, level };
  });
};
