import { queries } from "../config";

export const responsiveProps = (propValue, cssPropertyName) => {
  if (!propValue) return;

  if (typeof propValue === 'string') return `${cssPropertyName}: ${propValue};`;

  // check if the value is an object
  // taken from https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript/8511350#8511350
  if (
    typeof propValue === 'object' &&
    !Array.isArray(propValue) &&
    propValue !== null
  ) {
    const css = {};

    const sizesSortedAlphabetically = Object.entries(propValue).sort((a, b) =>
      // sort the sized alphabetically so the media queries are in the correct order
      a[0].localeCompare(b[0])
    );

    for (const [size, value] of sizesSortedAlphabetically) {
      if (size === 'default') {
        css[cssPropertyName] = value;
      } else {
        css[`@media ${queries[size]}`] = {
          [cssPropertyName]: value,
        };
      }
    }

    return css;
  }
};
