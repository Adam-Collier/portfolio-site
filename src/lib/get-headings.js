export const getHeadings = (blocks) => {
  const headings = [];

  blocks.forEach((block) => {
    if (block.value.type === 'sub_header') {
      const subHeaderTitle = block.value.properties.title[0][0];
      const id = subHeaderTitle.toLowerCase().replace(/ /g, '-');
      headings.push({ id, title: subHeaderTitle, items: [] });
    }

    if (block.value.type === 'sub_sub_header') {
      const subSubHeaderTitle = block.value.properties.title[0][0];
      const id = subSubHeaderTitle.toLowerCase().replace(/ /g, '-');

      if (!headings[headings.length - 1]) {
        throw new Error('getHeadings expects the content to contain a H2.');
      }

      headings[headings.length - 1].items.push({
        id,
        title: subSubHeaderTitle,
      });
    }
  });

  return headings;
};
