export default {
  title: 'Adam Collier',
  author: {
    name: 'Adam Collier',
    summary: 'Creative UX Designer/Developer',
  },
  siteUrl: 'https://adamcollier.co.uk',
  description:
    'This site is as much for me as it is for you. See what snippets I like to use, what resources I learn from and my thoughts and processes.',
  social: {
    twitter: 'collieradam',
  },
  openGraph: {
    // anything in the public directory can be accessed from the root
    image: '/images/meta-image.jpg',
  },
};

export const saveeBoards = {
  desktop: '5fb3c9cbf7c86a3ed1019f85',
  print: '5b17bb66ef494b6aa2686140',
  '3D': '5fb44c7eb074713f1d2189e1',
};

const breakpoints = {
  mobileMax: 550,
  tabletMax: 1100,
  laptopMax: 1500,
};

export const queries = {
  sm: `(max-width: ${breakpoints.mobileMax}px)`,
  md: `(max-width: ${breakpoints.tabletMax}px)`,
  lg: `(max-width: ${breakpoints.laptopMax}px)`,
};
