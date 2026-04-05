import { dbAddRepo, dbGetRepoById, dbGetRepos } from '@/db/queries/repos';
import { ConnectRepoInput } from '@codelore/schemas';

export const connectRepo = async ({ githubId, name, owner }: ConnectRepoInput) => {
  const result = await dbAddRepo({
    githubId,
    name,
    githubOwner: owner,
  });
  return result;
};

export const getRepos = async () => {
  return dbGetRepos();
};

export const getRepoById = async (id: string) => {
  return dbGetRepoById(id);
};
