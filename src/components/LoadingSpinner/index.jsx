import * as React from 'react';
import {styled} from "goober";

const Wrapper = styled('svg')`
  animation: spin 1s linear infinite;
  --size: 1rem;
  width: var(--size);
  height: var(--size);
  position: absolute;


  circle {
      opacity: 0.25;
  }

  path {
      opacity: 0.75;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export function LoadingSpinner() {
  return (
    <Wrapper
      className="w-3.5 h-3.5 animate-spin text-primary"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </Wrapper>
  );
}
