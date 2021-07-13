const theme = {
  plain: {
    backgroundColor: '#1b1b1b',
    color: '#abb2bf',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: '#abb2bf',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'selector'],
      style: {
        color: '#e06c75',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#61afef',
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#eeebff',
      },
    },
    {
      types: [
        'attr-name',
        'boolean',
        'constant',
        'deleted',
        'number',
        'property',
        'symbol',
      ],
      style: {
        color: '#d19a66',
      },
    },
    {
      types: [
        'entity',
        'url',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'placeholder',
        'variable',
        'operator',
      ],
      style: {
        color: '#56b6c2',
      },
    },
    {
      types: ['string', 'char', 'inserted', 'builtin', 'attr-value'],
      style: {
        color: '#98c379',
      },
    },
    {
      types: ['at-rule', 'keyword'],
      style: {
        color: '#c678dd',
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#c4b9fe',
      },
    },
  ],
};

export default theme;
