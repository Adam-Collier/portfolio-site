import Text from '../components/Text';
import CodeBlock from '../components/CodeBlock';

export const baseComponents = {
  h1: (props) => <Text as="h1" size="2xl" heading {...props} />,
  h2: (props) => <Text as="h2" size="xl" heading {...props} />,
  h3: (props) => <Text as="h3" size="lg" heading {...props} />,
  h4: (props) => <Text as="h4" size="md" heading {...props} />,
  p: (props) => <Text {...props} />,
  pre: (props) => <CodeBlock {...props} />,
};
