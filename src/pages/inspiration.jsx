import { useRouter } from 'next/dist/client/router';
import SEO from '../components/Seo';
import InspirationGrid from '../components/InspirationGrid';
import { saveeBoards } from '../config';

const Inspiration = ({ images, boards }) => {
  const router = useRouter();

  return (
    <>
      <SEO
        title="Inspiration - Adam Collier"
        description="A space for visual references and quickly exploring exciting imagery and websites."
        pathname={router.pathname}
      />
      <InspirationGrid images={images} boards={boards} />
    </>
  );
};

export async function getStaticProps() {
  const allData = await Promise.all(
    Object.values(saveeBoards).map(async (id) => {
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
      boards: saveeBoards,
    },
    revalidate: 1,
  };
}

export default Inspiration;
