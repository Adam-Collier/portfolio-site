export const getHeadings = (source) => {
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source
    .split('\n')
    .filter((line) => line.match(/^###*\s/));

  // an array for creating our nested structure
  const headings = [];
  // a list of headings for our observer
  // this saves us having to walk the nested structure we make here
  const headingsList = [];

  let baseLevel;
  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  headingLines.forEach((line, index) => {
    const title = line.replace(/^###*\s/, '');
    // make lower case, remove any non alphanumeric characters (apart from spaces and dashes)
    // and then add dashes
    const id = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/gi, '')
      .replace(/ /g, '-');
    // I only care about h2 and h3.
    // If I wanted more levels, I'd need to count the
    // number of #s.
    const level = line.slice(0, 3) === '###' ? 3 : 2;
    // the first heading becomes our base level
    // this will decide whether we nest or not
    if (index === 0) baseLevel = level;
    // base our headings structure off of the first level obtained
    if (level === baseLevel) {
      headings.push({ id, title, items: [] });
    } else {
      headings[headings.length - 1].items.push({ id, title });
    }

    headingsList.push({ id });
  });

  return { headings, headingsList };
};
