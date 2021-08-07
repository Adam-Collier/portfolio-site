import css from 'styled-jsx/css';

export const resource = css.global`
  .resource {
    --columns: 200px 1fr;
    --gap: 1.25rem;
    display: grid;
    grid-template-columns: var(--columns);
    grid-gap: var(--gap);
  }
  .resource div p + p {
    margin-top: 0.125rem;
    color: var(--foreground-high);
    font-size: 0.875rem;
  }

  @media (max-width: 767px) {
    .resource {
      --columns: 100%;
      --gap: 0;
      grid-template-rows: min-content min-content;
    }
  }
`;
