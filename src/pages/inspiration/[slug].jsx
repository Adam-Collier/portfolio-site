import InspirationGrid from '../../components/InspirationGrid';
import SEO from '../../components/Seo';
import { saveeBoards } from '../../config';
import { toTitleCase } from '../../utils/to-title-case';

const Inspiration = ({ images, boards, slug }) => (
  <>
    <SEO
      title={`${toTitleCase(slug)} Inspiration - Adam Collier`}
      description="A space for visual references and quickly exploring exciting imagery and websites."
      pathname={`/inspiration/${slug}`}
    />
    <InspirationGrid images={images} boards={boards} slug={slug} />
  </>
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
