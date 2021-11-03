import InspirationGrid from '../../components/InspirationGrid';

const Inspiration = ({ images, boards, slug }) => (
  <InspirationGrid images={images} boards={boards} slug={slug} />
);

export async function getStaticProps({ params }) {
  const { slug } = params;

  const boards = {
    desktop: '5fb3c9cbf7c86a3ed1019f85',
    print: '5b17bb66ef494b6aa2686140',
  };

  const response = await fetch(
    `https://api.savee.it/user/adamcollier/boards/${boards[slug]}/items/`
  );

  const { data } = await response.json();

  return {
    props: {
      images: data,
      boards,
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
