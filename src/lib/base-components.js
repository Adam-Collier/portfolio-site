import Text from '../components/Text';
import CodeBlock from '../components/CodeBlock';

const styles = {
  scrollMargin: '80px',
};

export const baseComponents = {
  h1: (props) => (
    <Text as="h1" size="2xl" heading {...props} style={{ ...styles }} />
  ),
  h2: (props) => (
    <Text as="h2" size="xl" heading {...props} style={{ ...styles }} />
  ),
  h3: (props) => (
    <Text as="h3" size="lg" heading {...props} style={{ ...styles }} />
  ),
  h4: (props) => (
    <Text as="h4" size="md" heading {...props} style={{ ...styles }} />
  ),
  p: (props) => <Text {...props} />,
  pre: (props) => <CodeBlock {...props} />,
};
