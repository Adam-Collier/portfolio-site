import InspirationGrid from '../components/InspirationGrid';

const Inspiration = ({ images, boards }) => (
  <InspirationGrid images={images} boards={boards} />
);

export async function getStaticProps() {
  const boards = {
    desktop: '5fb3c9cbf7c86a3ed1019f85',
    print: '5b17bb66ef494b6aa2686140',
  };

  const allData = await Promise.all(
    Object.values(boards).map(async (id) => {
      const response = await fetch(
        `https://api.savee.it/user/adamcollier/boards/${id}/items/`
      );
      const { data } = await response.json();

      return data;
    })
  );

  const flattenedArr = allData.flat();

  // sort posts by when they were added
  const sortedByDate = flattenedArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return {
    props: {
      images: sortedByDate,
      boards,
    },
    revalidate: 1,
  };
}

export default Inspiration;
