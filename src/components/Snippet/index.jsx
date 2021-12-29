import Link from "next/dist/client/link";
import Text from "../Text";
import Stack from "../Stack";
import { toReact } from "../../lib/unified";
import {styled} from "goober";
import { toSlug } from "../../utils/to-slug";

const Wrapper = styled(Stack)`
  position: relative;
  > a {
    text-decoration: none;
    color: var(--primary-foreground);
  }
`;

const Snippet = ({children, title, collectionName, content}) => {
    const slug = toSlug(`${collectionName}/#${title}`);

    return (
      <Wrapper gap={0.5}>
        <Link href={`/snippets/${slug}`}>
          <a>
            <Text as="h2" size="lg" id={slug} heading>
              {title}
            </Text>
          </a>
        </Link>
        {toReact(content)}
        {children}
      </Wrapper>
    );
}

export default Snippet;