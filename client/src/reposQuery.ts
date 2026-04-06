import { mutationOptions, queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { connectRepo, getExternalRepos, getRepos, triggerSync } from './api';
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

export const externalReposQueryOptions = queryOptions({
  queryKey: ['external-repos'],
  queryFn: getExternalRepos,
});

export const useExternalReposQuery = (enabled = true) =>
  useQuery({
    ...externalReposQueryOptions,
    enabled,
    initialData: () => queryClient.getQueryData(externalReposQueryOptions.queryKey),
  });

export const connectRepoMutationOptions = mutationOptions({
  mutationKey: ['connect-repo'],
  mutationFn: connectRepo,
  onSuccess: async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['repos'] }),
      queryClient.invalidateQueries({ queryKey: ['stats'] }),
    ]);
  },
});

export const useConnectRepoMutation = (setConnecting: (value: string | null) => void, onClose: () => void) =>
  useMutation({
    ...connectRepoMutationOptions,
    onSuccess: async (data, variables, context, meta) => {
      await connectRepoMutationOptions.onSuccess?.(data, variables, context, meta);
      await triggerSync(data.id);
      setConnecting(null);
      onClose();
    },
    onError: (_error, _variables, _context) => {
      setConnecting(null);
    },
  });
