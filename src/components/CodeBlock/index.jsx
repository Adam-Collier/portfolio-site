import React from 'react';
import Highlight, { Prism } from 'prism-react-renderer';
import normalize from './normalize';
import CopyButton from '../CopyButton';
import atomTheme from './theme';

const getParams = (name = ``) => {
  const [lang, params = ``] = name.split(`:`);
  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`);
      merged[key] = value;
      return merged;
    }, {})
  );
};

/*
 * MDX passes the code block as JSX
 * we un-wind it a bit to get the string content
 * but keep it extensible so it can be used with just children (string) and className
 */
const CodeBlock = ({
  children,
  className = children.props ? children.props.className : ``,
}) => {
  const [language, { title = `` }] = getParams(className);
  const [content, highlights] = normalize(
    children.props && children.props.children
      ? children.props.children
      : children,
    className
  );

  // console.log(styles, 'these are the styles');

  return (
    <div style={{ position: 'relative' }}>
      <Highlight
        /* eslint-disable react/jsx-props-no-spreading */
        Prism={Prism}
        code={content}
        language={language}
        theme={atomTheme}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <div className="gatsby-highlight">
            {title && (
              <div className="gatsby-highlight-header">
                <div className="gatsby-code-title">{title}</div>
              </div>
            )}
            <pre className={className} style={style}>
              <CopyButton fileName={title} content={content} />
              {tokens.map((line, index) => {
                const lineProps = getLineProps({ line, key: index });
                const lineclassname = [lineProps.className]
                  .concat(highlights[index] && `gatsby-highlight-code-line`)
                  .filter(Boolean)
                  .join(` `);
                return (
                  <div key={index} {...{ ...lineProps, lineclassname }}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                );
              })}
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
