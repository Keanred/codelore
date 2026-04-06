import { queryOptions, useQuery } from '@tanstack/react-query';
import { getStats } from './api';
import { queryClient } from './App';

export const statsQueryOptions = queryOptions({
  queryKey: ['stats'],
  queryFn: getStats,
});

export const useStatsQuery = () =>
  useQuery({
    ...statsQueryOptions,
    initialData: () => queryClient.getQueryData(statsQueryOptions.queryKey),
  });
