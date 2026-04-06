import { queryOptions, useQuery } from '@tanstack/react-query';
import { getRepos } from './api';
import { queryClient } from './App';

export const reposQueryOptions = queryOptions({
  queryKey: ['repos'],
  queryFn: getRepos,
});

export const useReposQuery = () =>
  useQuery({
    ...reposQueryOptions,
    initialData: () => queryClient.getQueryData(reposQueryOptions.queryKey),
  });
