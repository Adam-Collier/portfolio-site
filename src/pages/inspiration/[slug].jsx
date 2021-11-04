import InspirationGrid from '../../components/InspirationGrid';
import { saveeBoards } from '../../config';

const Inspiration = ({ images, boards, slug }) => (
  <InspirationGrid images={images} boards={boards} slug={slug} />
);

export async function getStaticProps({ params }) {
  const { slug } = params;

  const response = await fetch(
    `https://api.savee.it/user/adamcollier/boards/${saveeBoards[slug]}/items/`
  );

  const { data } = await response.json();

  return {
    props: {
      images: data,
      boards: saveeBoards,
      slug,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const boards = ['desktop', 'print'];

  const paths = boards.map((name) => {
    const slug = name;

    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export default Inspiration;
