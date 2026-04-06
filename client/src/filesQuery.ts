import { queryOptions, useQuery } from '@tanstack/react-query';
import { getFiles } from './api';
import { queryClient } from './App';

export const filesQueryOptions = (repoId: string) =>
  queryOptions({
    queryKey: ['files', repoId],
    queryFn: () => getFiles(repoId),
  });

export const useFilesQuery = (repoId: string) =>
  useQuery({
    ...filesQueryOptions(repoId),
    enabled: !!repoId,
    initialData: () => queryClient.getQueryData(filesQueryOptions(repoId).queryKey),
  });
