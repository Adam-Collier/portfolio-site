export const getBlockMap = (blocks) =>
  // group ordered lists and unordered list in their own group type
  blocks.reduce((arr, block) => {
    const listTypes = ['bulleted_list_item', 'numbered_list_item'];
    // check if block type is bullet or numbered
    if (listTypes.includes(block.type)) {
      // create bullet/numbered_list_group type
      const groupType = `${block.type.slice(0, -4)}group`;
      // if a group doesnt exist, add one
      if (arr.length === 0 || arr[arr.length - 1].type !== groupType) {
        // create the group and add the group
        arr.push({
          type: groupType,
          items: [{ ...block }],
        });
      } else {
        // otherwise add to the last group
        arr[arr.length - 1].items.push(block);
      }
      return arr;
    }

    arr.push(block);

    return arr;
  }, []);
