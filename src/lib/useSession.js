// import { useEffect } from 'react';
// import Router from 'next/router';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useSession({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: admin, mutate: mutateAdmin } = useSWR('/api/user', fetcher);

  return { admin, mutateAdmin };
}
